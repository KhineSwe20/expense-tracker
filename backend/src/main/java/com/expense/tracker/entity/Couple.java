package com.expense.tracker.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(name = "couples")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Couple {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, unique = true, length = 20)
	private String inviteCode;

	@Column(nullable = false, updatable = false)
	private Instant createdAt;

	@PrePersist
	protected void onCreate() {
		if (createdAt == null) {
			createdAt = Instant.now();
		}
	}
}
