package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.auth.LoginRequest;
import com.ecommerce.backend.dto.auth.LoginResponse;
import com.ecommerce.backend.dto.auth.SignupRequest;
import com.ecommerce.backend.dto.auth.UserDto;
import com.ecommerce.backend.dto.common.MessageResponse;
import com.ecommerce.backend.entity.ActivationTokenEntity;
import com.ecommerce.backend.entity.RoleEntity;
import com.ecommerce.backend.entity.StoreEntity;
import com.ecommerce.backend.entity.UserEntity;
import com.ecommerce.backend.exception.ApiException;
import com.ecommerce.backend.repository.ActivationTokenRepository;
import com.ecommerce.backend.repository.RoleRepository;
import com.ecommerce.backend.repository.StoreRepository;
import com.ecommerce.backend.repository.UserRepository;
import io.jsonwebtoken.Claims;
import java.time.LocalDateTime;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final StoreRepository storeRepository;
    private final ActivationTokenRepository activationTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            RoleRepository roleRepository,
            StoreRepository storeRepository,
            ActivationTokenRepository activationTokenRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.storeRepository = storeRepository;
        this.activationTokenRepository = activationTokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Transactional
    public MessageResponse signup(SignupRequest request) {
        userRepository.findByEmailIgnoreCase(request.email()).ifPresent(x -> {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Email already exists");
        });

        RoleEntity role = roleRepository.findById(request.role_id())
                .orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "Role not found"));

        UserEntity user = new UserEntity();
        user.setRole(role);
        user.setName(request.name());
        user.setEmail(request.email());
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setIsActive(true);
        user = userRepository.save(user);

        if ("store".equalsIgnoreCase(role.getCode()) && request.store() != null) {
            StoreEntity store = new StoreEntity();
            store.setUser(user);
            store.setName(request.store().name());
            store.setPhone(request.store().phone());
            store.setTaxNo(request.store().tax_no());
            store.setBankAccount(request.store().bank_account());
            storeRepository.save(store);
        }

        // Dev flow: account is active right after signup.
        return new MessageResponse("User created.");
    }

    @Transactional
    public MessageResponse activate(String tokenValue) {
        if (tokenValue == null || tokenValue.isBlank()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Activation token is missing.");
        }

        ActivationTokenEntity token = activationTokenRepository.findByToken(tokenValue)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Invalid activation token."));

        if (Boolean.TRUE.equals(token.getUsed()) || token.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new ApiException(HttpStatus.NOT_FOUND, "Invalid activation token.");
        }

        token.setUsed(true);
        token.getUser().setIsActive(true);
        return new MessageResponse("Account activated.");
    }

    public LoginResponse login(LoginRequest request) {
        UserEntity user = userRepository.findByEmailIgnoreCase(request.email())
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "Invalid email or password"));

        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }
        String token = jwtService.generateToken(user);
        return new LoginResponse(token, toUserDto(user));
    }

    public LoginResponse verifyWithToken(String authHeader) {
        String token = extractToken(authHeader, "No token");
        UserEntity user = getUserFromAuth(authHeader, "No token");
        return new LoginResponse(token, toUserDto(user));
    }

    public UserEntity getUserFromAuth(String authHeader, String missingMessage) {
        try {
            String token = extractToken(authHeader, missingMessage);
            Claims claims = jwtService.parse(token);
            Long userId = Long.valueOf(claims.getSubject());
            return userRepository.findById(userId)
                    .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "User is not verified"));
        } catch (Exception ex) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, missingMessage);
        }
    }

    private UserDto toUserDto(UserEntity user) {
        return new UserDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().getId()
        );
    }

    private String extractToken(String authHeader, String missingMessage) {
        if (authHeader == null || authHeader.isBlank()) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, missingMessage);
        }
        String token = authHeader.startsWith("Bearer ")
                ? authHeader.substring(7).trim()
                : authHeader.trim();
        if (token.isBlank()) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, missingMessage);
        }
        return token;
    }
}
