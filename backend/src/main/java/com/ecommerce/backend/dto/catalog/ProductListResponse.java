package com.ecommerce.backend.dto.catalog;

import java.util.List;

public record ProductListResponse(
        List<ProductDto> products,
        long total
) {
}
