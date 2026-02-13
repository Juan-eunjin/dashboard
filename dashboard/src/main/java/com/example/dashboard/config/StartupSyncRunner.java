package com.example.dashboard.config;

import com.example.dashboard.service.JiraApiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.example.dashboard.common.LogMessage;

/**
 * 애플리케이션 구동 직후 자동으로 실행되는 메서드
 * 
 * @param args 애플리케이션 실행 시 전달된 인자
 */

@Slf4j
@Component // 스프링이 이 클래스를 관리하도록 빈(Bean)으로 등록
@RequiredArgsConstructor // final이 붙은 필드(JiraApiService)를 생성자로 자동 주입 (Lombok)
public class StartupSyncRunner implements CommandLineRunner {
    private final JiraApiService jiraApiService;

    @Override
    public void run(String... args) {
        log.info(LogMessage.SYNC_START);
        jiraApiService.fetchAndSaveJiraIssues();
        log.info(LogMessage.SYNC_COMPLETE);
    }
}