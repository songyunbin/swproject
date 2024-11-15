package com.example.swproject.service;

import com.example.swproject.entity.Search;
import com.example.swproject.repository.SearchRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchService {
    private final SearchRepository searchRepository;

    public SearchService(SearchRepository searchRepository){
        this.searchRepository = searchRepository;
    }

    // keyword로 검색
    public List<Search> searchByName(String keyword){
        return searchRepository.findByKeywordContaining(keyword);
    }
}
