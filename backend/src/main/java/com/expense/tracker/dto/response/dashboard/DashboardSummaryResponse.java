package com.expense.tracker.dto.response.dashboard;

import com.expense.tracker.dto.response.expense.ExpenseResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@AllArgsConstructor
public class DashboardSummaryResponse {
    private BigDecimal totalExpensesThisMonth;
    private int expenseCount;
    private long goalsCompletedToday;
    private long goalsTotalToday;
    private List<ExpenseResponse> recentExpenses;
}
