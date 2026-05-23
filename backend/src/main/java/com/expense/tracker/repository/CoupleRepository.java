package com.expense.tracker.repository;

import com.expense.tracker.entity.Couple;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CoupleRepository extends JpaRepository<Couple, Long> {

	Optional<Couple> findByInviteCode(String inviteCode);

	boolean existsByInviteCode(String inviteCode);
}
