package com.example.dashboard.controller;

import com.example.dashboard.service.SearchService;
import com.example.dashboard.dto.SearchResultResponse;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class SearchController {

    private final SearchService searchService;

    /**
     * 통합 검색
     * 
     * @param label
     * @param startDate
     * @param endDate
     * @param status
     * @param page
     * @param limit
     * @returns
     */
    @GetMapping("/search")
    public ResponseEntity<SearchResultResponse> integratedSearch(
            @RequestParam(required = false) String label,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit) {

        return ResponseEntity.ok(searchService.getIntegratedSearch(label, startDate, endDate, status, page, limit));
    }
}