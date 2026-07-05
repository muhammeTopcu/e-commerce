package com.ecommerce.backend.repository;

import com.ecommerce.backend.entity.StoreEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoreRepository extends JpaRepository<StoreEntity, Long> {

    Optional<StoreEntity> findByUserId(Long userId);
}
