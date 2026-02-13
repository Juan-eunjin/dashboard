package com.example.dashboard.util;

import java.util.List;
import java.util.Map;

import com.example.dashboard.common.CommonLabel;
import com.example.dashboard.common.JiraFieldKey;
import com.example.dashboard.domain.JiraIssue;

/**
 * Jira API 응답을 JiraIssue DTO로 변환하는 유틸 클래스
 * 
 * 사용법
 * - 지라에서 받아오는 response를 Map으로 변환한 후, fromMap 메서드를 호출하여 JiraIssue DTO로 변환
 * - 필요한 데이터는 builder 패턴을 사용하여 추가 가능
 */
public class JiraIssueConverter {
    @SuppressWarnings("unchecked")
    public static JiraIssue fromMap(Map<String, Object> issueMap) {
        Map<String, Object> fields = (Map<String, Object>) issueMap.get(JiraFieldKey.FIELDS);

        // 1. 가공이 필요한 데이터 미리 추출
        Map<String, Object> statusMap = (Map<String, Object>) fields.get(JiraFieldKey.STATUS);
        Map<String, Object> assigneeMap = (Map<String, Object>) fields.get(JiraFieldKey.ASSIGNEE);
        List<String> labelList = (List<String>) fields.get(JiraFieldKey.LABELS);

        // 2. Builder로 한 번에 조립 (체이닝 방식)
        JiraIssue dto = JiraIssue.builder()
                .issueKey((String) issueMap.get(JiraFieldKey.KEY))
                .title((String) fields.get(JiraFieldKey.SUMMARY))
                .status(statusMap != null ? (String) statusMap.get(JiraFieldKey.NAME) : CommonLabel.NONE)
                .assignee(assigneeMap != null ? (String) assigneeMap.get(JiraFieldKey.DISPLAY_NAME)
                        : CommonLabel.NO_ASSIGN)
                .labels(labelList != null ? String.join(", ", labelList) : CommonLabel.NONE)
                .build();

        // 3. 날짜 처리 (생성된 객체에 날짜 주입)
        DateUtil.processDates(dto, fields);

        return dto;
    }
}
