package com.ecommerce.backend.dto.catalog;

import java.util.List;

public record ProductDto(
        Long id,
        String name,
        String description,
        Double price,
        Integer stock,
        Long store_id,
        Long category_id,
        Double rating,
        Integer sell_count,
        List<ProductImageDto> images
) {
}
