package com.example.dashboard.service;

import org.springframework.stereotype.Service;

import com.example.dashboard.common.LogMessage;
import com.example.dashboard.dto.SearchResultResponse;
import com.example.dashboard.repository.SearchRepository;
import com.example.dashboard.util.PageRequest;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 비즈니스 로직 중심
 */
@RequiredArgsConstructor
@Slf4j
@Service
public class SearchService {
    private final SearchRepository searchRepository;
    private final JiraApiService jiraApiService;

    public SearchResultResponse getIntegratedSearch(String label, String startDate, String endDate, String status,
            int page, int limit) {
        // 1. 비즈니스 로직: 데이터 동기화
        try {
            jiraApiService.fetchAndSaveJiraIssues();
        } catch (Exception e) {
            log.error(LogMessage.SYNC_FAILED, e);
        }

        // 2. 비즈니스 로직: 페이징 처리
        PageRequest pageRequest = new PageRequest(page, limit);

        // 3. 데이터 조회
        return searchRepository.getDetailedIssueList(
                label, startDate, endDate, status,
                pageRequest.getOffset(), pageRequest.getLimit());
    }

}
