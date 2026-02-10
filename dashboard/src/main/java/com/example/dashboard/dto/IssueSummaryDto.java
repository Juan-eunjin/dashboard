package com.example.dashboard.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IssueSummaryDto {
    private int totalIssues;
    private int inProgress;
    private int overdue;
    private int done;
}
