package com.ecommerce.backend.dto.order;

public record OrderItemDto(
        Long product_id,
        Integer count,
        String detail
) {
}
