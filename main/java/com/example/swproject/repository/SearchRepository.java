package com.example.swproject.repository;

import com.example.swproject.entity.Search;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SearchRepository extends JpaRepository<Search, Long> {
    // keyword에 해당하는 검색어를 포함한 검색
    List<Search> findByKeywordContaining(String keyword);

    // 사용자 정의 쿼리 (검색어 키워드로 검색)
    @Query("SELECT s FROM Search s WHERE s.keyword LIKE %:keyword%")
    List<Search> searchByKeyword(@Param("keyword") String keyword);
}
