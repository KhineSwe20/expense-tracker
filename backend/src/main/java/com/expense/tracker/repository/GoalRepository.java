package com.expense.tracker.repository;

import com.expense.tracker.entity.Goal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface GoalRepository extends JpaRepository<Goal, Long> {

	List<Goal> findByUserIdAndGoalDateOrderByCreatedAtAsc(Long userId, LocalDate goalDate);

	List<Goal> findByCoupleIdAndGoalDateOrderByCreatedAtAsc(Long coupleId, LocalDate goalDate);

	Optional<Goal> findByIdAndUserId(Long id, Long userId);
}
