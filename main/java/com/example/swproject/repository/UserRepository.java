package com.example.swproject.repository;


import com.example.swproject.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUserName(String userName); // 메소드 이름 수정
    Optional<User> findByKakaoId(Long kakaoId);
}
