package com.example.dashboard.service;

import com.example.dashboard.common.CommonLabel;
import com.example.dashboard.common.JiraApiPath;
import com.example.dashboard.common.JiraFieldKey;
import com.example.dashboard.common.LogMessage;
import com.example.dashboard.domain.JiraIssue;
import com.example.dashboard.mapper.JiraMapper;
import com.example.dashboard.util.*;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class JiraApiService {

    private final JiraMapper jiraMapper;
    private final String apiToken;
    private final RestClient restClient;

    public JiraApiService(
            JiraMapper jiraMapper,
            @Value("${jira.api.token}") String apiToken) {

        this.jiraMapper = jiraMapper;
        this.apiToken = apiToken;

        this.restClient = RestClient.builder()
                .baseUrl(JiraApiPath.JIRA_URL)
                .defaultStatusHandler(HttpStatusCode::isError, (request, response) -> {
                    log.error(CommonLabel.LOG_FOMAT, LogMessage.API_REQUEST_FAILED, response.getStatusCode());
                    throw new RuntimeException(LogMessage.API_REQUEST_FAILED + response.getStatusCode());
                })
                .build();
    }

    public void fetchAndSaveJiraIssues() {
        List<Map<String, Object>> issues = fetchIssues();
        if (issues == null)
            return;

        log.info(CommonLabel.LOG_FOMAT, LogMessage.ISSUES_FETCHED, issues.size());

        for (Map<String, Object> issueMap : issues) {
            JiraIssue dto = JiraIssueConverter.fromMap(issueMap); // 변환은 Converter가 진행
            jiraMapper.insert(dto); // 저장은 Service가 진행
        }
    }

    @SuppressWarnings("unchecked")
    private List<Map<String, Object>> fetchIssues() {
        Map response = restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path(JiraApiPath.SEARCH_JQL_PATH)
                        .queryParam("jql", JiraApiPath.DEFAULT_PROJECT_JQL)
                        .queryParam("fields", JiraApiPath.DEFAULT_FIELDS)
                        .build())
                .headers(headers -> headers.setBasicAuth(JiraApiPath.EMAIL, apiToken))
                .retrieve()
                .body(Map.class);

        if (response == null || !response.containsKey(JiraFieldKey.ISSUES)) {
            log.warn(LogMessage.NO_ISSUES_FOUND);
            return null;
        }

        return (List<Map<String, Object>>) response.get(JiraFieldKey.ISSUES);
    }
}
