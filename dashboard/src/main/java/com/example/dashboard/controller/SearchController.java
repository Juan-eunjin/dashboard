package com.example.dashboard.controller;

import com.example.dashboard.repository.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@RestController
@RequestMapping("/dashboard")
public class SearchController {

    @Autowired
    private SearchService searchService;

    // 검색 로직 구현
    @GetMapping("/search/issuesdate")
    public ResponseEntity<?> searchIssues(@RequestParam(required = false) String label,
                                          @RequestParam String startDate,
                                          @RequestParam String endDate) {
        //날짜 차이 계산 - 최대 1달까지만 허용
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);

        //31일 초과시 에러 반환
        if (ChronoUnit.DAYS.between(start, end) > 31) {
            return ResponseEntity.badRequest().body("날짜 범위는 최대 31일 이내로 설정해야 합니다.");
        }

        return ResponseEntity.ok().body(searchService.getIssuesDates(label, startDate, endDate));
    }

    @GetMapping("/search/project")
    public ResponseEntity<List<String>> getProjects() {
        return ResponseEntity.ok().body(searchService.getUniqueProject());
    }
}
