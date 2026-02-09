//package com.example.dashboard.service;
//
//import com.example.dashboard.domain.JiraIssue;
//import com.example.dashboard.mapper.JiraMapper;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpEntity;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpMethod;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestTemplate;
//
//import java.time.ZonedDateTime;
//import java.time.format.DateTimeFormatter;
//import java.util.List;
//import java.util.Map;
//
/// /RestTemplate 기반 코드
//@Service
//@RequiredArgsConstructor
//public class JiraApiServiceOld {
//
//    private final RestTemplate restTemplate = new RestTemplate();
//    private final JiraMapper jiraMapper;
//
//    @Value("${jira.api.url}")
//    private String jiraUrl;
//
//    @Value("${jira.api.token}")
//    private String apiToken;
//
//    public void fetchAndSaveJiraIssues() {
//        // 1. API 호출 헤더 설정 (Basic Auth)
//        HttpHeaders headers = new HttpHeaders();
//        headers.setBasicAuth("eunjinshin97@gmail.com", apiToken); //이거 나중에 바꿔야지...
//        HttpEntity<String> entity = new HttpEntity<>(headers);
//
//        // 2. Jira REST API 호출 (최근 수정된 이슈들 가져오기)
//        String url = jiraUrl + "/rest/api/3/search/jql?jql=project='KAN'&fields=status,created,duedate,summary,assignee,project";
//        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);
//
//        //Jira API의 날짜 형식을 읽기 위한 포맷터 (ISO 8601)
//        DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
//
//        // 2. DB에 저장할 년-월-일 포맷터
//        DateTimeFormatter dateOnlyFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//
//        // 3. 응답 파싱 및 DB 저장
//        List<Map> issues = (List<Map>) response.getBody().get("issues");
//        for (Map issueMap : issues) {
//            // 이 로그를 추가해서 숫자가 0인지 확인해 보세요!
//            System.out.println("가져온 이슈 개수: " + (issues != null ? issues.size() : 0));
//
//            if (issues == null || issues.isEmpty()) {
//                System.out.println("경고: Jira에서 가져온 이슈가 없습니다. JQL이나 권한을 확인하세요.");
//                return;
//            }
//
//            Map fields = (Map) issueMap.get("fields");
//
//            JiraIssue dto = new JiraIssue();
//            dto.setIssueKey((String) issueMap.get("key")); // 루트의 key 추출
//
//            // 프로젝트 명
//            Map project = (Map) fields.get("project");
//            dto.setProjectName((String) project.get("name"));
//
//            dto.setTitle((String) fields.get("summary"));
//
//            // 상태 명
//            Map status = (Map) fields.get("status");
//            dto.setStatus((String) status.get("name"));
//
//            // 담당자 (없을 경우를 대비해 null 체크 권장)
//            Map assigneeMap = (Map) fields.get("assignee");
//            dto.setAssignee(assigneeMap != null ? (String) assigneeMap.get("displayName") : "Unassigned");
//
//            // 생성일 (issueDate) 변환
//            String createdStr = (String) fields.get("created");
//            if (createdStr != null) {
//                // T와 타임존이 포함된 문자열을 날짜 객체로 변환
//                ZonedDateTime zdt = ZonedDateTime.parse(createdStr, inputFormatter);
//                // "2026-02-05" 형태로 변환하여 저장
//                dto.setIssueDate(zdt.format(dateOnlyFormatter));
//            }
//
//            // 마감일 (dueDate) 변환
//            String dueStr = (String) fields.get("duedate");
//            if (dueStr != null) {
//                // duedate는 "2026-02-10"처럼 이미 날짜만 오는 경우가 많으므로 확인 후 처리
//                if (dueStr.contains("T")) {
//                    ZonedDateTime zdt = ZonedDateTime.parse(dueStr, inputFormatter);
//                    dto.setDueDate(zdt.format(dateOnlyFormatter));
//                } else {
//                    // 이미 "yyyy-MM-dd" 형태라면 그대로 저장
//                    dto.setDueDate(dueStr);
//                }
//            }
//
//            //DB 저장 호출
//            jiraMapper.insert(dto);
//        }
//    }
//}