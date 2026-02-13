package com.example.dashboard.service;

import com.example.dashboard.common.LogMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataUpdateService {

    private final JiraApiService jiraApiService;

    /**
     * @Scheduled: 특정 시간에 메서드를 자동으로 실행하게 함
     *             cron = "0 0 0 * * *": 초 분 시 일 월 요일 순서
     *             여기서는 [매일 0시 0분 0초]에 실행하라는 의미 (자정마다 실행)
     */
    @Scheduled(cron = "0 0 0 * * *")
    public void scheduleDailySync() {
        log.info(LogMessage.SCHEDULED_TASK_START);
        try {
            jiraApiService.fetchAndSaveJiraIssues();
            log.info(LogMessage.SCHEDULED_TASK_SUCCESS);

        } catch (Exception e) {
            log.error(LogMessage.SCHEDULED_TASK_ERROR, e.getMessage());
        }
    }
}