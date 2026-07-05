package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.catalog.CategoryDto;
import com.ecommerce.backend.dto.catalog.ProductDto;
import com.ecommerce.backend.dto.catalog.ProductListResponse;
import com.ecommerce.backend.dto.catalog.RoleDto;
import com.ecommerce.backend.service.CatalogService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping
public class CatalogController {

    private final CatalogService catalogService;

    public CatalogController(CatalogService catalogService) {
        this.catalogService = catalogService;
    }

    @GetMapping("/roles")
    public List<RoleDto> roles() {
        return catalogService.getRoles();
    }

    @GetMapping("/categories")
    public List<CategoryDto> categories() {
        return catalogService.getCategories();
    }

    @GetMapping("/products")
    public ProductListResponse products(
            @RequestParam(required = false) Integer limit,
            @RequestParam(required = false) Integer offset,
            @RequestParam(required = false) String filter,
            @RequestParam(required = false) String sort,
            @RequestParam(name = "category", required = false) Long categoryId
    ) {
        return catalogService.getProducts(limit, offset, filter, sort, categoryId);
    }

    @GetMapping("/products/{id}")
    public ProductDto productById(@PathVariable Long id) {
        return catalogService.getProductById(id);
    }
}
