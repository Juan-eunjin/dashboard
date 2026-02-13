package com.example.dashboard.common;

/**
 * 로그 메시지
 */

public class LogMessage {
    public static final String API_REQUEST_FAILED = "Jira API 요청 실패: ";
    public static final String NO_ISSUES_FOUND = "Warning: Jira에서 가져온 이슈가 없습니다.";
    public static final String ISSUES_FETCHED = "가져온 이슈 개수: ";
    public static final String SYNC_START = "Jira 이슈 동기화 시작";
    public static final String SYNC_COMPLETE = "Jira 이슈 동기화 종료";
    public static final String SYNC_FAILED = "Jira 이슈 동기화 실패: ";
    public static final String SCHEDULED_TASK_START = "=== [데이터 갱신] 1시간 주기 작업을 시작합니다. ===";
    public static final String SCHEDULED_TASK_SUCCESS = "=== [데이터 갱신] 성공적으로 완료되었습니다. ===";
    public static final String SCHEDULED_TASK_ERROR = "=== [데이터 갱신] 에러 발생 ===";
}
