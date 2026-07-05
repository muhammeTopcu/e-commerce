package com.ecommerce.backend.repository;

import com.ecommerce.backend.entity.AddressEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<AddressEntity, Long> {

    List<AddressEntity> findByUserId(Long userId);
}
