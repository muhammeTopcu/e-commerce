package com.ecommerce.backend.dto.order;

import java.util.List;

public record OrderDto(
        Long id,
        String order_date,
        Double price,
        List<OrderItemDto> products
) {
}
