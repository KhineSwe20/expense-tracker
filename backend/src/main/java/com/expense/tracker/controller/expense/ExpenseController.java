package com.expense.tracker.controller.expense;

import com.expense.tracker.dto.request.expense.CreateExpenseRequest;
import com.expense.tracker.dto.response.expense.ExpenseResponse;
import com.expense.tracker.service.ExpenseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
public class ExpenseController {
    private final ExpenseService expenseService;

    @GetMapping
    public List<ExpenseResponse> getAll(@RequestHeader(value = "Authorization", required = false) String authorization) {
        return expenseService.getAll(authorization);
    }

    @PostMapping
    public ExpenseResponse create(@RequestHeader(value = "Authorization", required = false) String authorization,
                                  @Valid @RequestBody CreateExpenseRequest request) {
        return expenseService.create(authorization, request);
    }
}
