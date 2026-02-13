package com.example.dashboard.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IssueListResponse {
    private String issueKey;
    private String labels;
    private String summary;
    private String status;
    private String assignee;
    private String issueDate;
    private String dueDate;
}
