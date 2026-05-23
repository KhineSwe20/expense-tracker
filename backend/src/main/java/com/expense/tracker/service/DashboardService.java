package com.expense.tracker.service;

import com.expense.tracker.dto.response.dashboard.DashboardSummaryResponse;
import com.expense.tracker.dto.response.expense.ExpenseResponse;
import com.expense.tracker.entity.Expense;
import com.expense.tracker.entity.Goal;
import com.expense.tracker.entity.User;
import com.expense.tracker.repository.ExpenseRepository;
import com.expense.tracker.repository.GoalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {
    private final AuthService authService;
    private final ExpenseRepository expenseRepository;
    private final GoalRepository goalRepository;

    public DashboardSummaryResponse getSummary(String authorization) {
        User user = authService.getUserFromAuthorization(authorization);
        Long coupleId = user.getCouple().getId();
        YearMonth month = YearMonth.now();
        LocalDate start = month.atDay(1);
        LocalDate end = month.atEndOfMonth();

        List<Expense> monthExpenses = expenseRepository.findByCoupleIdAndExpenseDateBetweenOrderByExpenseDateDescCreatedAtDesc(coupleId, start, end);
        BigDecimal total = monthExpenses.stream()
                .map(Expense::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        List<Goal> todayGoals = goalRepository.findByCoupleIdAndGoalDateOrderByCreatedAtAsc(coupleId, LocalDate.now());
        long completed = todayGoals.stream().filter(Goal::isCompleted).count();

        List<ExpenseResponse> recent = monthExpenses.stream().limit(5).map(ExpenseResponse::from).toList();
        return new DashboardSummaryResponse(total, monthExpenses.size(), completed, todayGoals.size(), recent);
    }
}
