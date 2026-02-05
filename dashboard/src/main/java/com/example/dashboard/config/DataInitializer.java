package com.example.dashboard.config;

import com.example.dashboard.service.JiraApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    private final JiraApiService jiraApiService;

    @Override
    public void run(String... args) {
        System.out.println("Jira 데이터 동기화 시작...");
        jiraApiService.fetchAndSaveJiraIssues();
        System.out.println("동기화 완료!");
    }
}