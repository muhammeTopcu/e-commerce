package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.catalog.CategoryDto;
import com.ecommerce.backend.dto.catalog.ProductDto;
import com.ecommerce.backend.dto.catalog.ProductImageDto;
import com.ecommerce.backend.dto.catalog.ProductListResponse;
import com.ecommerce.backend.dto.catalog.RoleDto;
import com.ecommerce.backend.entity.CategoryEntity;
import com.ecommerce.backend.entity.ProductEntity;
import com.ecommerce.backend.repository.CategoryRepository;
import com.ecommerce.backend.repository.ProductImageRepository;
import com.ecommerce.backend.repository.ProductRepository;
import com.ecommerce.backend.repository.RoleRepository;
import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import com.ecommerce.backend.exception.ApiException;

@Service
public class CatalogService {

    private final RoleRepository roleRepository;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;

    public CatalogService(
            RoleRepository roleRepository,
            CategoryRepository categoryRepository,
            ProductRepository productRepository,
            ProductImageRepository productImageRepository
    ) {
        this.roleRepository = roleRepository;
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.productImageRepository = productImageRepository;
    }

    public List<RoleDto> getRoles() {
        return roleRepository.findAll().stream()
                .map(x -> new RoleDto(x.getId(), x.getName(), x.getCode()))
                .toList();
    }

    public List<CategoryDto> getCategories() {
        return categoryRepository.findAll().stream()
                .map(this::toCategoryDto)
                .toList();
    }

    public ProductListResponse getProducts(Integer limit, Integer offset, String filter, String sort, Long categoryId) {
        int safeLimit = (limit == null || limit <= 0) ? 25 : limit;
        int safeOffset = (offset == null || offset < 0) ? 0 : offset;
        int page = safeOffset / safeLimit;

        Pageable pageable = PageRequest.of(page, safeLimit, parseSort(sort));

        Page<ProductEntity> result = productRepository.findAll(buildSpec(categoryId, filter), pageable);

        if (categoryId != null && result.getTotalElements() == 0) {
            Long fallbackCategoryId = findFallbackCategoryId(categoryId);
            if (fallbackCategoryId != null) {
                result = productRepository.findAll(buildSpec(fallbackCategoryId, filter), pageable);
            }
        }

        List<ProductDto> products = result.getContent().stream().map(this::toProductDto).toList();
        return new ProductListResponse(products, result.getTotalElements());
    }

    private org.springframework.data.jpa.domain.Specification<ProductEntity> buildSpec(Long categoryId, String filter) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (categoryId != null) {
                predicates.add(cb.equal(root.get("category").get("id"), categoryId));
            }
            if (filter != null && !filter.isBlank()) {
                predicates.add(cb.like(cb.lower(root.get("name")), "%" + filter.toLowerCase() + "%"));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

    private Long findFallbackCategoryId(Long categoryId) {
        return categoryRepository.findById(categoryId)
                .filter(category -> "e".equalsIgnoreCase(category.getGender()))
                .flatMap(maleCategory ->
                        categoryRepository.findByTitleIgnoreCaseAndGender(maleCategory.getTitle(), "k")
                )
                .map(CategoryEntity::getId)
                .orElse(null);
    }

    public ProductDto getProductById(Long id) {
        ProductEntity product = productRepository.findById(id)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Product not found"));
        return toProductDto(product);
    }

    private Sort parseSort(String sort) {
        if (sort == null || sort.isBlank()) {
            return Sort.by(Sort.Direction.ASC, "id");
        }
        return switch (sort) {
            case "price:asc" -> Sort.by(Sort.Direction.ASC, "price");
            case "price:desc" -> Sort.by(Sort.Direction.DESC, "price");
            case "rating:asc" -> Sort.by(Sort.Direction.ASC, "rating");
            case "rating:desc" -> Sort.by(Sort.Direction.DESC, "rating");
            default -> Sort.by(Sort.Direction.ASC, "id");
        };
    }

    private CategoryDto toCategoryDto(CategoryEntity entity) {
        return new CategoryDto(
                entity.getId(),
                entity.getCode(),
                entity.getTitle(),
                entity.getImg(),
                entity.getRating(),
                entity.getGender()
        );
    }

    private ProductDto toProductDto(ProductEntity entity) {
        List<ProductImageDto> images = productImageRepository.findByProductIdOrderBySortOrderAsc(entity.getId())
                .stream()
                .map(img -> new ProductImageDto(img.getUrl(), img.getSortOrder()))
                .toList();

        return new ProductDto(
                entity.getId(),
                entity.getName(),
                entity.getDescription(),
                entity.getPrice(),
                entity.getStock(),
                entity.getStore().getId(),
                entity.getCategory().getId(),
                entity.getRating(),
                entity.getSellCount(),
                images
        );
    }
}
