package com.ecommerce.backend.dto.order;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record OrderItemRequest(
        @NotNull Long product_id,
        @NotNull Integer count,
        @NotBlank String detail
) {
}
