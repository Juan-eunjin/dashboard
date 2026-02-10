package com.example.dashboard.service;

import com.example.dashboard.domain.JiraIssue;
import com.example.dashboard.mapper.JiraMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

//restClient기반 코드
@Service
public class JiraApiService {

    private final JiraMapper jiraMapper;
    private final String apiToken;
    private final RestClient restClient;

    public JiraApiService(
            JiraMapper jiraMapper,
            @Value("${jira.api.url}") String jiraUrl,
            @Value("${jira.api.token}") String apiToken) {

        this.jiraMapper = jiraMapper;
        this.apiToken = apiToken;

        this.restClient = RestClient.builder()
                .baseUrl(jiraUrl)
                .defaultStatusHandler(HttpStatusCode::isError, (request, response) -> {
                    System.err.println("Jira API 요청 실패: " + response.getStatusCode());
                })
                .build();
    }

    public void fetchAndSaveJiraIssues() {
        // 1. URL 경로에서 /jql 제거 (포스트맨 성공 기준 v3 적용)
        Map response = restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/rest/api/3/search/jql")
                        .queryParam("jql", "project='KAN'")
                        .queryParam("fields", "status,created,duedate,summary,assignee,labels")
                        .build())
                .headers(headers -> headers.setBasicAuth("eunjinshin97@gmail.com", apiToken))
                .retrieve()
                .body(Map.class);

        if (response == null || !response.containsKey("issues")) {
            System.out.println("경고: Jira에서 가져온 이슈가 없습니다.");
            return;
        }

        List<Map<String, Object>> issues = (List<Map<String, Object>>) response.get("issues");
        System.out.println("가져온 이슈 개수: " + issues.size());

        // 날짜 포맷터 (Jira v3는 ISO 8601 형식을 사용함)
        DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
        DateTimeFormatter dateOnlyFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        for (Map<String, Object> issueMap : issues) {
            Map<String, Object> fields = (Map<String, Object>) issueMap.get("fields");
            JiraIssue dto = new JiraIssue();

            dto.setIssueKey((String) issueMap.get("key"));
            dto.setTitle((String) fields.get("summary"));

            // 상태(status) 처리
            Map<String, Object> status = (Map<String, Object>) fields.get("status");
            if (status != null) {
                dto.setStatus((String) status.get("name"));
            }

            // 담당자(assignee) 처리
            Map<String, Object> assigneeMap = (Map<String, Object>) fields.get("assignee");
            dto.setAssignee(assigneeMap != null ? (String) assigneeMap.get("displayName") : "Unassigned");

            // 🌟 Labels 처리 (포스트맨에서 확인된 [] 배열 처리)
            Object labelsObj = fields.get("labels");
            if (labelsObj instanceof List) {
                List<String> labelsList = (List<String>) labelsObj;
                dto.setLabels(String.join(", ", labelsList)); // ["프로젝트2"] -> "프로젝트2"
            }

            // 날짜 처리 함수 호출
            processDates(dto, fields, inputFormatter, dateOnlyFormatter);

            jiraMapper.insert(dto);
        }
    }

    private void processDates(JiraIssue dto, Map<String, Object> fields, DateTimeFormatter in, DateTimeFormatter out) {
        String createdStr = (String) fields.get("created");
        if (createdStr != null) {
            dto.setIssueDate(ZonedDateTime.parse(createdStr, in).format(out));
        }

        String dueStr = (String) fields.get("duedate");
        if (dueStr != null) {
            // 마감일이 시간 포함 포맷인지 단순 날짜 포맷인지 체크
            if (dueStr.contains("T")) {
                dto.setDueDate(ZonedDateTime.parse(dueStr, in).format(out));
            } else {
                dto.setDueDate(dueStr);
            }
        }
    }
}