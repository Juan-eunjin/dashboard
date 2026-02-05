package com.example.dashboard.mapper;

import com.example.dashboard.domain.JiraIssue;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface JiraMapper {
    // XML의 <insert id="insert">와 이름이 같아야 합니다.
    int insert(JiraIssue issue);
}