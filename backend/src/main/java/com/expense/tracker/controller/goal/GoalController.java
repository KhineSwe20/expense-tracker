package com.expense.tracker.controller.goal;

import com.expense.tracker.dto.request.goal.CreateGoalRequest;
import com.expense.tracker.dto.request.goal.UpdateGoalRequest;
import com.expense.tracker.dto.response.goal.GoalResponse;
import com.expense.tracker.service.GoalService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/goals")
@RequiredArgsConstructor
public class GoalController {
    private final GoalService goalService;

    @GetMapping
    public List<GoalResponse> getByDate(@RequestHeader(value = "Authorization", required = false) String authorization,
                                        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return goalService.getByDate(authorization, date);
    }

    @PostMapping
    public GoalResponse create(@RequestHeader(value = "Authorization", required = false) String authorization,
                               @Valid @RequestBody CreateGoalRequest request) {
        return goalService.create(authorization, request);
    }

    @PatchMapping("/{id}")
    public GoalResponse update(@RequestHeader(value = "Authorization", required = false) String authorization,
                               @PathVariable Long id,
                               @RequestBody UpdateGoalRequest request) {
        return goalService.update(authorization, id, request);
    }
}
