package com.example.dashboard.repository;

import com.example.dashboard.domain.JiraIssue;
import com.example.dashboard.dto.SearchResultResponse;
import com.example.dashboard.mapper.SearchMapper;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 순수하게 데이터만 가져오는 역할
 */

@Repository
@RequiredArgsConstructor
public class SearchRepositoryImpl implements SearchRepository {

    private final SearchMapper searchMapper;

    @Override
    public List<JiraIssue> getIssuesDates(String label, String startDate, String endDate, String status) {
        return searchMapper.findIssues(startDate, endDate, label, status);
    }

    @Override
    public List<String> getUniqueProject() {
        return searchMapper.findUniqueProjects();
    }

    @Override
    public SearchResultResponse getDetailedIssueList(String label, String startDate, String endDate, String status,
            int offset, int limit) {
        List<JiraIssue> issues = searchMapper.findDetailedIssues(label, startDate, endDate, status, offset, limit);
        int totalCount = searchMapper.countDetailedIssues(label, startDate, endDate, status);

        return new SearchResultResponse(issues, totalCount);
    }
}