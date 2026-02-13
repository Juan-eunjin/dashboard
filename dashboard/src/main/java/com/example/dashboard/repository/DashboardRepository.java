package com.example.dashboard.repository;

import com.example.dashboard.dto.DailyIssueResponse;
import com.example.dashboard.dto.IssueSummaryDto;

import java.util.List;

public interface DashboardRepository {
    IssueSummaryDto getIssueSummary(String labels, String startDate, String endDate);

    List<DailyIssueResponse> getDailyIssues(String labels, String startDate, String endDate);

    List<String> getProjectList();
}
