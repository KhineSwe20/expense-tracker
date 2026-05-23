package com.expense.tracker.service;

import com.expense.tracker.dto.request.goal.CreateGoalRequest;
import com.expense.tracker.dto.request.goal.UpdateGoalRequest;
import com.expense.tracker.dto.response.goal.GoalResponse;
import com.expense.tracker.entity.Goal;
import com.expense.tracker.entity.User;
import com.expense.tracker.repository.GoalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GoalService {
    private final GoalRepository goalRepository;
    private final AuthService authService;

    public List<GoalResponse> getByDate(String authorization, LocalDate date) {
        User user = authService.getUserFromAuthorization(authorization);
        return goalRepository.findByCoupleIdAndGoalDateOrderByCreatedAtAsc(user.getCouple().getId(), date)
                .stream().map(GoalResponse::from).toList();
    }

    public GoalResponse create(String authorization, CreateGoalRequest request) {
        User user = authService.getUserFromAuthorization(authorization);
        Goal goal = Goal.builder()
                .title(request.getTitle())
                .goalDate(request.getGoalDate())
                .completed(false)
                .couple(user.getCouple())
                .user(user)
                .build();
        return GoalResponse.from(goalRepository.save(goal));
    }

    public GoalResponse update(String authorization, Long id, UpdateGoalRequest request) {
        User user = authService.getUserFromAuthorization(authorization);
        Goal goal = goalRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Goal not found"));
        if (!goal.getCouple().getId().equals(user.getCouple().getId())) {
            throw new IllegalArgumentException("You cannot update this goal");
        }
        goal.setCompleted(request.isCompleted());
        goal.setCompletedAt(request.isCompleted() ? Instant.now() : null);
        return GoalResponse.from(goalRepository.save(goal));
    }
}
