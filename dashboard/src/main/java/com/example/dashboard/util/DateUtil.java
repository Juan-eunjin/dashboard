package com.example.dashboard.util;

import com.example.dashboard.common.DateFormat;
import com.example.dashboard.common.JiraFieldKey;
import com.example.dashboard.domain.JiraIssue;

import java.time.ZonedDateTime;
import java.util.Map;

public class DateUtil {
    /**
     * Jira API 응답 데이터(fields)에서 날짜를 꺼내어 JiraIssue 객체에 알맞은 형식으로 넣어줌
     * 
     * @param dto    데이터를 담을 객체
     * @param fields Jira API로부터 받은 데이터 뭉치 (Map 형태)
     */
    public static void processDates(JiraIssue dto, Map<String, Object> fields) {
        String createdStr = (String) fields.get(JiraFieldKey.CREATED);
        if (createdStr != null) {
            // ISO 날짜 형식(예: 2024-02-13T10:00:00.000+0900)을 해석해서
            // 우리가 정한 포맷(예: 2024-02-13)으로 변환하여 저장
            dto.setIssueDate(
                    ZonedDateTime.parse(createdStr, DateFormat.INPUT_FORMATTER).format(DateFormat.DATE_ONLY_FORMATTER));
        }

        String dueStr = (String) fields.get(JiraFieldKey.DUEDATE);
        if (dueStr != null) {
            // Jira는 기한 데이터 형식이 일정하지 않을 수 있음 (시간 포함 여부 체크)
            if (dueStr.contains("T")) {
                // "T"가 포함된 경우(시간 정보가 있는 경우) -> 생성일과 동일하게 파싱 후 변환
                dto.setDueDate(
                        ZonedDateTime.parse(dueStr, DateFormat.INPUT_FORMATTER).format(DateFormat.DATE_ONLY_FORMATTER));
            } else {
                dto.setDueDate(dueStr);
            }
        }
    }
}
