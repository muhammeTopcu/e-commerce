package com.ecommerce.backend.repository;

import com.ecommerce.backend.entity.ProductImageEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductImageRepository extends JpaRepository<ProductImageEntity, Long> {

    List<ProductImageEntity> findByProductIdOrderBySortOrderAsc(Long productId);
}
