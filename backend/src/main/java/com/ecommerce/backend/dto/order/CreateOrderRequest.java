package com.ecommerce.backend.dto.order;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public record CreateOrderRequest(
        @NotNull Long address_id,
        @NotBlank String order_date,
        @NotBlank String card_no,
        @NotBlank String card_name,
        @NotNull Integer card_expire_month,
        @NotNull Integer card_expire_year,
        @NotNull Integer card_ccv,
        @NotNull Double price,
        @NotEmpty List<@Valid OrderItemRequest> products
) {
}
