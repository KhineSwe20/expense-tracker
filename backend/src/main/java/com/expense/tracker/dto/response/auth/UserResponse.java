package com.expense.tracker.dto.response.auth;

import com.expense.tracker.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserResponse {
    private Long id;
    private String email;
    private String name;
    private Long coupleId;

    public static UserResponse from(User user) {
        return new UserResponse(
                user.getId(),
                user.getEmail(),
                user.getName(),
                user.getCouple() == null ? null : user.getCouple().getId()
        );
    }
}
