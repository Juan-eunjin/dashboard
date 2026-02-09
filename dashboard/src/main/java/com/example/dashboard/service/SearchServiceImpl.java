package com.example.dashboard.service;

import com.example.dashboard.domain.JiraIssue;
import com.example.dashboard.mapper.SearchMapper;
import com.example.dashboard.repository.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchServiceImpl implements SearchService {

    @Autowired
    private SearchMapper searchMapper;

    @Override
    public List<JiraIssue> getIssuesDates(String label, String startDate, String endDate) {
        return searchMapper.findIssues(startDate, endDate, label);
    }

    @Override
    public List<String> getUniqueProject() {
        return searchMapper.findUniqueProjects();
    }
}
