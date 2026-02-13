package com.example.dashboard.controller;

import com.example.dashboard.dto.DailyIssueResponse;
import com.example.dashboard.dto.IssueSummaryDto;
import com.example.dashboard.service.DashboardService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashboardApiController {

    private final DashboardService dashboardService;

    // 1. 상태별 이슈 개수 조회
    @GetMapping("/summary")
    public IssueSummaryDto getSummary(
            @RequestParam(required = false) String labels,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {

        return dashboardService.getIssueSummary(labels, startDate, endDate);
    }

    // 2. 일일 이슈 개수 조회
    @GetMapping("/daily-issues")
    public List<DailyIssueResponse> getDailyIssues(@RequestParam(required = false) String labels,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {

        return dashboardService.getDailyIssues(labels, startDate, endDate);
    }

    // 3. 프로젝트 목록 조회
    @GetMapping("/projectslist")
    public List<String> getProjectList() {
        return dashboardService.getProjectList();
    }
}
