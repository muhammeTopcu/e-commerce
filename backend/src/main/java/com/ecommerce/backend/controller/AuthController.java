package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.auth.LoginRequest;
import com.ecommerce.backend.dto.auth.LoginResponse;
import com.ecommerce.backend.dto.auth.SignupRequest;
import com.ecommerce.backend.dto.common.MessageResponse;
import com.ecommerce.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public MessageResponse signup(@Valid @RequestBody SignupRequest request) {
        return authService.signup(request);
    }

    @GetMapping("/activate")
    public MessageResponse activate(@RequestParam(name = "token", required = false) String token) {
        return authService.activate(token);
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @GetMapping("/verify")
    public LoginResponse verify(@RequestHeader(name = "Authorization", required = false) String authorization) {
        return authService.verifyWithToken(authorization);
    }
}
