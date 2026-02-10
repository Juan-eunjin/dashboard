package com.example.dashboard.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IssueListResponse {
    private String issueKey;
    private String labels; //프로젝트
    private String summary; //이슈 제목
    private String status; //이슈 상태
    private String assignee;
    private String issueDate;
    private String dueDate;
}
