package com.example.dashboard.repository;

import com.example.dashboard.domain.JiraIssue;

import java.util.List;

public interface SearchService {
    List<JiraIssue> getIssuesDates(String startDate, String endDate, String label);

    List<String> getUniqueProject();

}
