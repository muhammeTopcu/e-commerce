package com.ecommerce.backend.dto.auth;

public record UserDto(
        Long id,
        String name,
        String email,
        Long role_id
) {
}
