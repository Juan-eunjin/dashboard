package com.example.dashboard.dto;

import java.util.List;

import com.example.dashboard.domain.JiraIssue;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SearchResultResponse {
    private List<JiraIssue> issues;
    private int totalCount;
}
