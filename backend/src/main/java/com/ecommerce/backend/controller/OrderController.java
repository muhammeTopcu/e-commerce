package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.order.CreateOrderRequest;
import com.ecommerce.backend.dto.order.OrderDto;
import com.ecommerce.backend.entity.UserEntity;
import com.ecommerce.backend.service.AuthService;
import com.ecommerce.backend.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {

    private final AuthService authService;
    private final OrderService orderService;

    public OrderController(AuthService authService, OrderService orderService) {
        this.authService = authService;
        this.orderService = orderService;
    }

    @GetMapping
    public List<OrderDto> list(@RequestHeader(name = "Authorization", required = false) String authorization) {
        UserEntity user = authService.getUserFromAuth(authorization, "User is not verified");
        return orderService.list(user);
    }

    @PostMapping
    public OrderDto create(
            @RequestHeader(name = "Authorization", required = false) String authorization,
            @Valid @RequestBody CreateOrderRequest request
    ) {
        UserEntity user = authService.getUserFromAuth(authorization, "User is not verified");
        return orderService.create(user, request);
    }
}
