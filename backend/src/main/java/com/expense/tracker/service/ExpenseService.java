package com.expense.tracker.service;

import com.expense.tracker.dto.request.expense.CreateExpenseRequest;
import com.expense.tracker.dto.response.expense.ExpenseResponse;
import com.expense.tracker.entity.Expense;
import com.expense.tracker.entity.User;
import com.expense.tracker.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseService {
    private final ExpenseRepository expenseRepository;
    private final AuthService authService;

    public List<ExpenseResponse> getAll(String authorization) {
        User user = authService.getUserFromAuthorization(authorization);
        return expenseRepository.findByCoupleIdOrderByExpenseDateDescCreatedAtDesc(user.getCouple().getId())
                .stream().map(ExpenseResponse::from).toList();
    }

    public ExpenseResponse create(String authorization, CreateExpenseRequest request) {
        User user = authService.getUserFromAuthorization(authorization);
        Expense expense = Expense.builder()
                .amount(request.getAmount())
                .description(request.getDescription())
                .expenseDate(request.getExpenseDate())
                .couple(user.getCouple())
                .paidBy(user)
                .build();
        return ExpenseResponse.from(expenseRepository.save(expense));
    }
}
