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
    //1.이슈 저장
    int insert(JiraIssue issue);

    //2. 메인 대시보드 통계 조회
    IssueSummaryDto getIssueSummary(
            @Param("labels") String labels,
            @Param("startDate") String startDate,
            @Param("endDate") String endDate
    );

    //3. 일일 이슈 발생 내역 조회
    List<DailyIssueResponse> getDailyIssues(
            @Param("labels") String labels,
            @Param("startDate") String startDate,
            @Param("endDate") String endDate
    );

    //4.프로젝트 목록 조회
    List<String> getProjectList();

    //5. 상세 페이지 용 이슈 리스트 조회
    List<IssueListResponse> getIssuesList(
            @Param("labels") String labels,
            @Param("startDate") String startDate,
            @Param("endDate") String endDate,
            @Param("status") String status,
            @Param("offset") int offset,
            @Param("limit") int limit
    );
}