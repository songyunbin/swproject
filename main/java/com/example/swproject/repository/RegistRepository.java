package com.example.swproject.repository;

import com.example.swproject.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegistRepository extends JpaRepository<Product, Integer> {

}
