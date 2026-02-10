package com.example.dashboard.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DailyIssueResponse {
    private String labels;
    private String issueDate;
    private int totalIssues;
}
