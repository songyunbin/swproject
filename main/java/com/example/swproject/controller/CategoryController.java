package com.example.swproject.controller;

import com.example.swproject.entity.Category;
import com.example.swproject.service.CategoryService;
import com.example.swproject.service.RegistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/category")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @Autowired
    private RegistService registService;

    @GetMapping
    public List<Product> getAllProducts(){
        return registService.findAll();
    }

    @PostMapping("/regist")
    public Product registerProduct(
            @RequestParam("title") String title,
            @RequestParam("category_id") Integer category_Id,
            @RequestParam("price") Integer price,
            @RequestParam("description") String description,
            @RequestParam("status") char status,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        // categoryId로 Category 조회
        Category category = categoryService.findById(category_Id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid category ID: " + category_Id));

        // Product 객체 생성 및 데이터 설정
        Product product = new Product();
        product.setTitle(title);
        product.setPrice(price);
        product.setDescription(description);
        product.setStatus(status);
        product.setCategory(category); // Category 설정

        // 이미지 처리 로직 추가 (필요 시)
        if (image != null && !image.isEmpty()) {
            // 이미지 저장 로직 구현 (예: 이미지 경로 설정)
            // 예: String imagePath = saveImage(image);
            // product.setImage(imagePath);
        }

        return registService.save(product);
    }
}
