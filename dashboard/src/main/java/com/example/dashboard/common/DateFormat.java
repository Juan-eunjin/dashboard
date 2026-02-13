package com.example.dashboard.common;

import java.time.format.DateTimeFormatter;

/**
 * 날짜 포맷
 */
public class DateFormat {
    public static final DateTimeFormatter INPUT_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
    public static final DateTimeFormatter DATE_ONLY_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");
}
