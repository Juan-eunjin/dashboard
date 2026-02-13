package com.example.dashboard.repository;

import org.springframework.stereotype.Repository;
import java.util.List;

import com.example.dashboard.dto.DailyIssueResponse;
import com.example.dashboard.dto.IssueSummaryDto;
import com.example.dashboard.mapper.JiraMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class DashboardRepositoryImpl implements DashboardRepository {

    private final JiraMapper jiraMapper;

    @Override
    public IssueSummaryDto getIssueSummary(String label, String startDate, String endDate) {
        return jiraMapper.getIssueSummary(label, startDate, endDate);
    }

    @Override
    public List<DailyIssueResponse> getDailyIssues(String label, String startDate, String endDate) {
        return jiraMapper.getDailyIssues(label, startDate, endDate);
    }

    @Override
    public List<String> getProjectList() {
        return jiraMapper.getProjectList();
    }

}
