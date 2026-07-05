package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.order.CreateOrderRequest;
import com.ecommerce.backend.dto.order.OrderDto;
import com.ecommerce.backend.dto.order.OrderItemDto;
import com.ecommerce.backend.entity.AddressEntity;
import com.ecommerce.backend.entity.OrderEntity;
import com.ecommerce.backend.entity.OrderItemEntity;
import com.ecommerce.backend.entity.ProductEntity;
import com.ecommerce.backend.entity.UserEntity;
import com.ecommerce.backend.exception.ApiException;
import com.ecommerce.backend.repository.AddressRepository;
import com.ecommerce.backend.repository.OrderItemRepository;
import com.ecommerce.backend.repository.OrderRepository;
import com.ecommerce.backend.repository.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final AddressRepository addressRepository;
    private final ProductRepository productRepository;

    public OrderService(
            OrderRepository orderRepository,
            OrderItemRepository orderItemRepository,
            AddressRepository addressRepository,
            ProductRepository productRepository
    ) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.addressRepository = addressRepository;
        this.productRepository = productRepository;
    }

    public List<OrderDto> list(UserEntity user) {
        return orderRepository.findByUserIdOrderByOrderDateDesc(user.getId())
                .stream()
                .map(this::toDto)
                .toList();
    }

    @Transactional
    public OrderDto create(UserEntity user, CreateOrderRequest request) {
        AddressEntity address = addressRepository.findById(request.address_id())
                .filter(x -> x.getUser().getId().equals(user.getId()))
                .orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "Address not found"));

        OrderEntity order = new OrderEntity();
        order.setUser(user);
        order.setAddress(address);
        order.setOrderDate(LocalDateTime.parse(request.order_date()));
        order.setPrice(request.price());
        order.setCardName(request.card_name());
        order.setCardExpireMonth(request.card_expire_month());
        order.setCardExpireYear(request.card_expire_year());
        order.setCardCcv(request.card_ccv());
        order = orderRepository.save(order);

        for (var itemReq : request.products()) {
            ProductEntity product = productRepository.findById(itemReq.product_id())
                    .orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "Product not found"));
            OrderItemEntity item = new OrderItemEntity();
            item.setOrder(order);
            item.setProduct(product);
            item.setCount(itemReq.count());
            item.setDetail(itemReq.detail());
            orderItemRepository.save(item);
        }

        return toDto(order);
    }

    private OrderDto toDto(OrderEntity order) {
        List<OrderItemDto> products = orderItemRepository.findByOrderId(order.getId()).stream()
                .map(item -> new OrderItemDto(
                        item.getProduct().getId(),
                        item.getCount(),
                        item.getDetail()
                ))
                .toList();

        return new OrderDto(
                order.getId(),
                order.getOrderDate().toString(),
                order.getPrice(),
                products
        );
    }
}
