package com.example.dashboard.mapper;

import com.example.dashboard.domain.JiraIssue;
import com.example.dashboard.dto.DailyIssueResponse;
import com.example.dashboard.dto.IssueListResponse;
import com.example.dashboard.dto.IssueSummaryDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface JiraMapper {
        int insert(JiraIssue issue);

        IssueSummaryDto getIssueSummary(
                        @Param("labels") String labels,
                        @Param("startDate") String startDate,
                        @Param("endDate") String endDate);

        List<DailyIssueResponse> getDailyIssues(
                        @Param("labels") String labels,
                        @Param("startDate") String startDate,
                        @Param("endDate") String endDate);

        List<String> getProjectList();

        List<IssueListResponse> getIssuesList(
                        @Param("labels") String labels,
                        @Param("startDate") String startDate,
                        @Param("endDate") String endDate,
                        @Param("status") String status,
                        @Param("offset") int offset,
                        @Param("limit") int limit);
}