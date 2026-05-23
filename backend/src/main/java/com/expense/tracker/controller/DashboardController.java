package com.expense.tracker.controller;

import com.expense.tracker.dto.response.dashboard.DashboardSummaryResponse;
import com.expense.tracker.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {
    private final DashboardService dashboardService;

    @GetMapping
    public DashboardSummaryResponse getSummary(@RequestHeader(value = "Authorization", required = false) String authorization) {
        return dashboardService.getSummary(authorization);
    }
}
