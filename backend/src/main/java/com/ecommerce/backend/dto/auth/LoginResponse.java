package com.ecommerce.backend.dto.auth;

public record LoginResponse(
        String token,
        UserDto user
) {
}
