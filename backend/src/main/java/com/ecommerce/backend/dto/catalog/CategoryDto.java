package com.ecommerce.backend.dto.catalog;

public record CategoryDto(
        Long id,
        String code,
        String title,
        String img,
        Double rating,
        String gender
) {
}
