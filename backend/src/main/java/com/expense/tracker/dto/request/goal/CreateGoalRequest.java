package com.expense.tracker.dto.request.goal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class CreateGoalRequest {
    @NotBlank
    private String title;

    @NotNull
    private LocalDate goalDate;
}
