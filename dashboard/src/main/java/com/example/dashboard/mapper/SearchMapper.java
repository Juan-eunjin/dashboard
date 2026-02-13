package com.example.dashboard.mapper;

import com.example.dashboard.domain.JiraIssue;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SearchMapper {

        List<JiraIssue> findIssues(
                        @Param("startDate") String startDate,
                        @Param("endDate") String endDate,
                        @Param("label") String label,
                        @Param("status") String status);

        List<String> findUniqueProjects();

        List<JiraIssue> findDetailedIssues(
                        @Param("label") String label,
                        @Param("startDate") String startDate,
                        @Param("endDate") String endDate,
                        @Param("status") String status,
                        @Param("offset") int offset,
                        @Param("limit") int limit);

        int countDetailedIssues(
                        @Param("label") String label,
                        @Param("startDate") String startDate,
                        @Param("endDate") String endDate,
                        @Param("status") String status);
}