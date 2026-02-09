package com.example.dashboard.domain;

import lombok.*;

@Setter
@Getter
public class JiraIssue {
    private String issueKey;
    private String labels;
    private String title;
    private String status;
    private String assignee;
    private String issueDate;
    private String dueDate;
}
