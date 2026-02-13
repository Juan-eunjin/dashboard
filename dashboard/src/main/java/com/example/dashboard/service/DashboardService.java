package com.example.dashboard.service;

import org.springframework.stereotype.Service;

import com.example.dashboard.dto.IssueSummaryDto;
import com.example.dashboard.repository.DashboardRepository;
import com.example.dashboard.dto.DailyIssueResponse;

import java.util.List;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final DashboardRepository dashboardRepository;

    public IssueSummaryDto getIssueSummary(String labels, String startDate, String endDate) {
        return dashboardRepository.getIssueSummary(labels, startDate, endDate);
    }

    public List<DailyIssueResponse> getDailyIssues(String labels, String startDate, String endDate) {
        return dashboardRepository.getDailyIssues(labels, startDate, endDate);
    }

    public List<String> getProjectList() {
        return dashboardRepository.getProjectList();
    }

}
