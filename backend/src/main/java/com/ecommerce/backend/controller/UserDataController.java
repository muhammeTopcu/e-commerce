package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.user.AddressDto;
import com.ecommerce.backend.dto.user.AddressRequest;
import com.ecommerce.backend.dto.user.CardDto;
import com.ecommerce.backend.dto.user.CardRequest;
import com.ecommerce.backend.entity.UserEntity;
import com.ecommerce.backend.service.AddressService;
import com.ecommerce.backend.service.AuthService;
import com.ecommerce.backend.service.CardService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserDataController {

    private final AuthService authService;
    private final AddressService addressService;
    private final CardService cardService;

    public UserDataController(AuthService authService, AddressService addressService, CardService cardService) {
        this.authService = authService;
        this.addressService = addressService;
        this.cardService = cardService;
    }

    @GetMapping("/address")
    public List<AddressDto> addresses(@RequestHeader(name = "Authorization", required = false) String authorization) {
        UserEntity user = authService.getUserFromAuth(authorization, "User is not verified");
        return addressService.list(user);
    }

    @PostMapping("/address")
    public List<AddressDto> createAddress(
            @RequestHeader(name = "Authorization", required = false) String authorization,
            @Valid @RequestBody AddressRequest request
    ) {
        UserEntity user = authService.getUserFromAuth(authorization, "User is not verified");
        return addressService.create(user, request);
    }

    @PutMapping("/address")
    public List<AddressDto> updateAddress(
            @RequestHeader(name = "Authorization", required = false) String authorization,
            @Valid @RequestBody AddressRequest request
    ) {
        UserEntity user = authService.getUserFromAuth(authorization, "User is not verified");
        return addressService.update(user, request);
    }

    @DeleteMapping("/address/{addressId}")
    public List<AddressDto> deleteAddress(
            @RequestHeader(name = "Authorization", required = false) String authorization,
            @PathVariable Long addressId
    ) {
        UserEntity user = authService.getUserFromAuth(authorization, "User is not verified");
        return addressService.delete(user, addressId);
    }

    @GetMapping("/card")
    public List<CardDto> cards(@RequestHeader(name = "Authorization", required = false) String authorization) {
        UserEntity user = authService.getUserFromAuth(authorization, "User is not verified");
        return cardService.list(user);
    }

    @PostMapping("/card")
    public List<CardDto> createCard(
            @RequestHeader(name = "Authorization", required = false) String authorization,
            @Valid @RequestBody CardRequest request
    ) {
        UserEntity user = authService.getUserFromAuth(authorization, "User is not verified");
        return cardService.create(user, request);
    }

    @PutMapping("/card")
    public List<CardDto> updateCard(
            @RequestHeader(name = "Authorization", required = false) String authorization,
            @Valid @RequestBody CardRequest request
    ) {
        UserEntity user = authService.getUserFromAuth(authorization, "User is not verified");
        return cardService.update(user, request);
    }

    @DeleteMapping("/card/{cardId}")
    public List<CardDto> deleteCard(
            @RequestHeader(name = "Authorization", required = false) String authorization,
            @PathVariable Long cardId
    ) {
        UserEntity user = authService.getUserFromAuth(authorization, "User is not verified");
        return cardService.delete(user, cardId);
    }
}
