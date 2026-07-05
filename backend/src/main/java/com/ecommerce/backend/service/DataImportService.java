package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.importer.ImportResultDto;
import com.ecommerce.backend.entity.CategoryEntity;
import com.ecommerce.backend.entity.ProductEntity;
import com.ecommerce.backend.entity.ProductImageEntity;
import com.ecommerce.backend.entity.RoleEntity;
import com.ecommerce.backend.entity.StoreEntity;
import com.ecommerce.backend.entity.UserEntity;
import com.ecommerce.backend.exception.ApiException;
import com.ecommerce.backend.repository.CategoryRepository;
import com.ecommerce.backend.repository.ProductImageRepository;
import com.ecommerce.backend.repository.ProductRepository;
import com.ecommerce.backend.repository.RoleRepository;
import com.ecommerce.backend.repository.StoreRepository;
import com.ecommerce.backend.repository.UserRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

@Service
public class DataImportService {

    private static final String LEGACY_BASE_URL = "https://workintech-fe-ecommerce.onrender.com";

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper;
    private final RoleRepository roleRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final StoreRepository storeRepository;
    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;

    public DataImportService(
            ObjectMapper objectMapper,
            RoleRepository roleRepository,
            CategoryRepository categoryRepository,
            UserRepository userRepository,
            StoreRepository storeRepository,
            ProductRepository productRepository,
            ProductImageRepository productImageRepository
    ) {
        this.objectMapper = objectMapper;
        this.roleRepository = roleRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
        this.storeRepository = storeRepository;
        this.productRepository = productRepository;
        this.productImageRepository = productImageRepository;
    }

    @Transactional
    public ImportResultDto importFromLegacyApi(boolean force) {
        if (!force && productRepository.count() > 0) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Products already exist. Use force=true to reimport.");
        }

        if (force) {
            productImageRepository.deleteAllInBatch();
            productRepository.deleteAllInBatch();
            categoryRepository.deleteAllInBatch();
        }

        int rolesImported = importRoles();
        RoleEntity storeRole = roleRepository.findByCode("store")
                .orElseThrow(() -> new ApiException(HttpStatus.INTERNAL_SERVER_ERROR, "Store role missing after import"));

        int categoriesImported = importCategories();
        ImportCounter productImportResult = importProducts(storeRole);

        return new ImportResultDto(
                rolesImported,
                categoriesImported,
                productImportResult.storesImported,
                productImportResult.productsImported,
                productImportResult.imagesImported
        );
    }

    private int importRoles() {
        JsonNode data = getJson(LEGACY_BASE_URL + "/roles");
        int imported = 0;
        for (JsonNode node : data) {
            String code = node.path("code").asText();
            if (code.isBlank()) {
                continue;
            }
            RoleEntity role = roleRepository.findByCode(code).orElseGet(RoleEntity::new);
            role.setCode(code);
            role.setName(node.path("name").asText(code));
            roleRepository.save(role);
            imported++;
        }
        return imported;
    }

    private int importCategories() {
        JsonNode data = getJson(LEGACY_BASE_URL + "/categories");
        int imported = 0;
        for (JsonNode node : data) {
            String code = node.path("code").asText();
            if (code.isBlank()) {
                continue;
            }
            CategoryEntity category = categoryRepository.findByCode(code).orElseGet(CategoryEntity::new);
            category.setCode(code);
            category.setTitle(node.path("title").asText());
            category.setImg(node.path("img").asText());
            category.setRating(node.path("rating").asDouble(0));
            category.setGender(node.path("gender").asText());
            categoryRepository.save(category);
            imported++;
        }
        return imported;
    }

    private ImportCounter importProducts(RoleEntity storeRole) {
        int offset = 0;
        int limit = 100;
        int productsImported = 0;
        int imagesImported = 0;
        int storesImported = 0;
        Map<Long, StoreEntity> storeMap = new HashMap<>();
        Map<Long, CategoryEntity> categoryMap = new HashMap<>();

        while (true) {
            JsonNode page = getJson(LEGACY_BASE_URL + "/products?limit=" + limit + "&offset=" + offset);
            JsonNode products = page.path("products");
            if (!products.isArray() || products.isEmpty()) {
                break;
            }

            for (JsonNode node : products) {
                Long sourceStoreId = node.path("store_id").asLong(1L);
                StoreEntity store = storeMap.computeIfAbsent(sourceStoreId, id -> createOrGetImportedStore(id, storeRole));
                if (storeMap.size() > storesImported) {
                    storesImported = storeMap.size();
                }

                Long sourceCategoryId = node.path("category_id").asLong();
                CategoryEntity category = categoryMap.computeIfAbsent(sourceCategoryId, id ->
                        categoryRepository.findById(id).orElseGet(() -> {
                            CategoryEntity fallback = new CategoryEntity();
                            fallback.setCode("legacy:" + id);
                            fallback.setTitle("Category " + id);
                            fallback.setImg("");
                            fallback.setRating(0.0);
                            fallback.setGender("k");
                            return categoryRepository.save(fallback);
                        })
                );

                ProductEntity product = new ProductEntity();
                product.setStore(store);
                product.setCategory(category);
                product.setName(node.path("name").asText());
                product.setDescription(node.path("description").asText(""));
                product.setPrice(node.path("price").asDouble(0));
                product.setStock(node.path("stock").asInt(0));
                product.setRating(node.path("rating").asDouble(0));
                product.setSellCount(node.path("sell_count").asInt(0));
                product = productRepository.save(product);
                productsImported++;

                JsonNode images = node.path("images");
                if (images.isArray()) {
                    int localIndex = 0;
                    for (JsonNode imageNode : images) {
                        ProductImageEntity image = new ProductImageEntity();
                        image.setProduct(product);
                        image.setUrl(imageNode.path("url").asText());
                        image.setSortOrder(imageNode.path("index").isMissingNode() ? localIndex : imageNode.path("index").asInt(localIndex));
                        productImageRepository.save(image);
                        imagesImported++;
                        localIndex++;
                    }
                }
            }

            offset += limit;
        }

        return new ImportCounter(storesImported, productsImported, imagesImported);
    }

    private StoreEntity createOrGetImportedStore(Long sourceStoreId, RoleEntity storeRole) {
        String email = "import-store-" + sourceStoreId + "@local.dev";
        UserEntity user = userRepository.findByEmailIgnoreCase(email).orElseGet(() -> {
            UserEntity created = new UserEntity();
            created.setRole(storeRole);
            created.setName("Imported Store " + sourceStoreId);
            created.setEmail(email);
            created.setPasswordHash("imported-store-no-login");
            created.setIsActive(true);
            created.setCreatedAt(LocalDateTime.now());
            return userRepository.save(created);
        });

        return storeRepository.findByUserId(user.getId())
                .orElseGet(() -> {
                    StoreEntity store = new StoreEntity();
                    store.setUser(user);
                    store.setName("Imported Store " + sourceStoreId);
                    store.setPhone("+900000000000");
                    store.setTaxNo("IMPORT-" + sourceStoreId);
                    store.setBankAccount("TR000000000000000000000000");
                    return storeRepository.save(store);
                });
    }

    private JsonNode getJson(String url) {
        try {
            ResponseEntity<String> response = restTemplate.getForEntity(URI.create(url), String.class);
            if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
                throw new ApiException(HttpStatus.BAD_GATEWAY, "Legacy API call failed: " + url);
            }
            return objectMapper.readTree(response.getBody());
        } catch (ApiException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new ApiException(HttpStatus.BAD_GATEWAY, "Legacy API call failed: " + url);
        }
    }

    private record ImportCounter(int storesImported, int productsImported, int imagesImported) {
    }
}
