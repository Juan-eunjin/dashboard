package com.example.dashboard.mapper;

import com.example.dashboard.domain.JiraIssue;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SearchMapper {

    // XML의 <select id="findIssues">와 메서드 이름이 같아야 함
    List<JiraIssue> findIssues(
            @Param("startDate") String startDate,
            @Param("endDate") String endDate,
            @Param("label") String label
    );

    // XML의 <select id="findUniqueProjects">와 연결
    List<String> findUniqueProjects();
}
