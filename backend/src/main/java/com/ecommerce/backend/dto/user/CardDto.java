package com.ecommerce.backend.dto.user;

public record CardDto(
        Long id,
        String card_no,
        Integer expire_month,
        Integer expire_year,
        String name_on_card
) {
}
