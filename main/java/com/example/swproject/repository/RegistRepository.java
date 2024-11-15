package com.example.swproject.repository;

import com.example.swproject.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegistRepository extends JpaRepository<Product, Integer> {
    List<Product> findAll();
}