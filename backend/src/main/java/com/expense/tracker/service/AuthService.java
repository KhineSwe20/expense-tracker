package com.expense.tracker.service;

import com.expense.tracker.dto.request.auth.LoginRequest;
import com.expense.tracker.dto.request.auth.RegisterRequest;
import com.expense.tracker.dto.response.auth.AuthResponse;
import com.expense.tracker.dto.response.auth.UserResponse;
import com.expense.tracker.entity.Couple;
import com.expense.tracker.entity.User;
import com.expense.tracker.repository.CoupleRepository;
import com.expense.tracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final CoupleRepository coupleRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        String email = request.getEmail().trim().toLowerCase();
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already exists");
        }

        Couple couple;
        if (request.getInviteCode() != null && !request.getInviteCode().isBlank()) {
            couple = coupleRepository.findByInviteCode(request.getInviteCode().trim().toUpperCase())
                    .orElseThrow(() -> new IllegalArgumentException("Invalid invite code"));
            if (userRepository.countByCoupleId(couple.getId()) >= 2) {
                throw new IllegalArgumentException("This couple already has two members");
            }
        } else {
            couple = Couple.builder().inviteCode(generateInviteCode()).build();
            couple = coupleRepository.save(couple);
        }

        User user = User.builder()
                .name(request.getName().trim())
                .email(email)
                .password(passwordEncoder.encode(request.getPassword()))
                .couple(couple)
                .build();
        user = userRepository.save(user);

        return new AuthResponse(createToken(user), UserResponse.from(user));
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail().trim().toLowerCase())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        return new AuthResponse(createToken(user), UserResponse.from(user));
    }

    public User getUserFromAuthorization(String authorization) {
        Long userId = parseUserIdFromAuthorization(authorization);
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public UserResponse me(String authorization) {
        return UserResponse.from(getUserFromAuthorization(authorization));
    }

    private String createToken(User user) {
        // Simple token for MVP. Later replace with real JWT.
        return "user-" + user.getId();
    }

    private Long parseUserIdFromAuthorization(String authorization) {
        if (authorization == null || !authorization.startsWith("Bearer user-")) {
            throw new IllegalArgumentException("Missing or invalid token");
        }
        return Long.parseLong(authorization.replace("Bearer user-", "").trim());
    }

    private String generateInviteCode() {
        String code;
        do {
            code = UUID.randomUUID().toString().replace("-", "").substring(0, 6).toUpperCase();
        } while (coupleRepository.existsByInviteCode(code));
        return code;
    }
}
