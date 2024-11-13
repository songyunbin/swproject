package com.example.swproject.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer user_id;

    @Column(nullable = false)
    private String user_name;

    @Column(nullable = false)
    private float location_x;

    @Column(nullable = false)
    private float location_y;

    @Column(nullable= false)
    private Timestamp created_at = Timestamp.valueOf(LocalDateTime.now());

    //한 유저가 여러 물건을 가질 수 있음
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    private List<Product> products;


    //지운 column
    //@Column(nullable = false)
    //private String password;

    //@Column(nullable = false)
    //private String email;
}