package com.example.dashboard.util;

import lombok.Getter;

@Getter
public class PageRequest {
    private final int offset;
    private final int limit;

    public PageRequest(int page, int limit) {
        this.offset = (page - 1) * limit;
        this.limit = limit;
    }
}
