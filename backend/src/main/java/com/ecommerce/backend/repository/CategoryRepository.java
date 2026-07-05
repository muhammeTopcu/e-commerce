package com.ecommerce.backend.repository;

import com.ecommerce.backend.entity.CategoryEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {

    Optional<CategoryEntity> findByCode(String code);

    Optional<CategoryEntity> findByTitleIgnoreCaseAndGender(String title, String gender);
}
