package com.example.dashboard.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class JiraScheduler {

    private final JiraApiService jiraApiService;

    /**
     * 방법 1: cron 표현식 사용 (매시 정각 0분 0초마다 실행)
     * 예: 1:00, 2:00, 3:00 ...
     */
    @Scheduled(cron = "0 0 * * * *")
    public void scheduleEveryHour() {
        log.info("=== [데이터 갱신] 1시간 주기 작업을 시작합니다. ===");
        try {
            jiraApiService.fetchAndSaveJiraIssues();
            log.info("=== [데이터 갱신] 성공적으로 완료되었습니다. ===");

        } catch (Exception e) {
            log.error("=== [데이터 갱신] 에러 발생: {} ===", e.getMessage());
        }
    }
}