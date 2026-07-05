package com.ecommerce.backend.repository;

import com.ecommerce.backend.entity.OrderEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {

    List<OrderEntity> findByUserIdOrderByOrderDateDesc(Long userId);
}
