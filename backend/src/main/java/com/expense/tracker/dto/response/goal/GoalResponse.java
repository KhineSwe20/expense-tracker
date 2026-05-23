package com.expense.tracker.dto.response.goal;

import com.expense.tracker.entity.Goal;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.Instant;
import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class GoalResponse {
    private Long id;
    private String title;
    private LocalDate goalDate;
    private boolean completed;
    private Instant completedAt;
    private Long userId;
    private String userName;

    public static GoalResponse from(Goal goal) {
        return new GoalResponse(
                goal.getId(),
                goal.getTitle(),
                goal.getGoalDate(),
                goal.isCompleted(),
                goal.getCompletedAt(),
                goal.getUser().getId(),
                goal.getUser().getName()
        );
    }
}
