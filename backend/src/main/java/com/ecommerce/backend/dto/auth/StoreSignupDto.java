package com.ecommerce.backend.dto.auth;

public record StoreSignupDto(
        String name,
        String phone,
        String tax_no,
        String bank_account
) {
}
