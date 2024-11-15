package com.example.swproject.controller;

import com.example.swproject.entity.Search;
import com.example.swproject.service.SearchService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SearchController {
    private final SearchService searchService;

    public SearchController(SearchService searchService){
        this.searchService = searchService;
    }

    // keyword로 검색
    @GetMapping("/search/name")
    public List<Search> searchByName(@RequestParam String keyword){
        return searchService.searchByName(keyword);
    }
}
