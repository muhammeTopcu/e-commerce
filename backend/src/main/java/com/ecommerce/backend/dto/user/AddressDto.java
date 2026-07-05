package com.ecommerce.backend.dto.user;

public record AddressDto(
        Long id,
        String title,
        String name,
        String surname,
        String phone,
        String city,
        String district,
        String neighborhood
) {
}
