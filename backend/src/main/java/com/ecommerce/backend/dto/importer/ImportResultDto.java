package com.ecommerce.backend.dto.importer;

public record ImportResultDto(
        int rolesImported,
        int categoriesImported,
        int storesImported,
        int productsImported,
        int imagesImported
) {
}
