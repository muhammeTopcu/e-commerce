package com.ecommerce.backend.repository;

import com.ecommerce.backend.entity.CardEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardRepository extends JpaRepository<CardEntity, Long> {

    List<CardEntity> findByUserId(Long userId);
}
