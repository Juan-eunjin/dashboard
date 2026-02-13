package com.example.dashboard.repository;

import com.example.dashboard.domain.JiraIssue;
import com.example.dashboard.dto.SearchResultResponse;

import java.util.List;

public interface SearchRepository {
    List<JiraIssue> getIssuesDates(String label, String startDate, String endDate, String status);

    List<String> getUniqueProject();

    SearchResultResponse getDetailedIssueList(String label, String startDate, String endDate, String status, int offset,
            int limit);
}