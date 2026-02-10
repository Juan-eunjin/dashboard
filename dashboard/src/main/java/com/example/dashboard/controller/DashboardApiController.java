package com.example.dashboard.controller;

import com.example.dashboard.dto.DailyIssueResponse;
import com.example.dashboard.dto.IssueListResponse;
import com.example.dashboard.dto.IssueSummaryDto;
import com.example.dashboard.mapper.JiraMapper;
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

    private final JiraMapper jiraMapper;


    //2.화면 상단의 Issue Summary 영역을 위한 데이터
    @GetMapping("/summary")
    public IssueSummaryDto getSummary(@RequestParam(required = false) String labels,
                                      @RequestParam(required = false) String startDate,
                                      @RequestParam(required = false) String endDate) {
        return jiraMapper.getIssueSummary(labels, startDate, endDate);
    }

    //3.일일 이슈 발생 내역 차트 데이터
    @GetMapping("/daily-issues")
    public List<DailyIssueResponse> getDailyIssues(@RequestParam(required = false) String labels,
                                                   @RequestParam(required = false) String startDate,
                                                   @RequestParam(required = false) String endDate) {

        return jiraMapper.getDailyIssues(labels, startDate, endDate);
    }

    //4.프로젝트 목록
    @GetMapping("/projects")
    public List<String> getProjectList() {
        return jiraMapper.getProjectList();
    }

    //5. 상세 페이지 용 이슈 리스트 조회
    @GetMapping("/issues-list")
    public List<IssueListResponse> getIssuesList(
            @RequestParam(required = false) String labels,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate,
            @RequestParam(required = false) String status, // 1. 상태 필터 추가
            @RequestParam(defaultValue = "1") int page,    // 2. 페이지 번호
            @RequestParam(defaultValue = "10") int limit   // 3. 페이지당 개수 (10 또는 20)
    ) {
        // MyBatis의 LIMIT #{offset}, #{limit}를 위한 offset 계산
        int offset = (page - 1) * limit;

        return jiraMapper.getIssuesList(labels, startDate, endDate, status, offset, limit);
    }
}
