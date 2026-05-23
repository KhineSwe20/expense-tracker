package com.expense.tracker.repository;

import com.expense.tracker.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

	List<Expense> findByCoupleIdAndExpenseDateOrderByCreatedAtDesc(Long coupleId, LocalDate expenseDate);

	List<Expense> findByCoupleIdOrderByExpenseDateDescCreatedAtDesc(Long coupleId);

	List<Expense> findByCoupleIdAndExpenseDateBetweenOrderByExpenseDateDescCreatedAtDesc(Long coupleId, LocalDate start, LocalDate end);
}
