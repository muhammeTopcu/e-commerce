package com.ecommerce.backend.dto.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CardRequest(
        Long id,
        @NotBlank String card_no,
        @NotNull Integer expire_month,
        @NotNull Integer expire_year,
        @NotBlank String name_on_card
) {
}
