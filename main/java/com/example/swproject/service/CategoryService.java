package com.example.swproject.service;

import com.example.swproject.entity.Category;
import com.example.swproject.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public Optional<Category> findById(Integer Id) {
        return categoryRepository.findById(Id);
    }
}
