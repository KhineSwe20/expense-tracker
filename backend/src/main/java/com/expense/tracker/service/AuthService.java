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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final CoupleRepository coupleRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        String email = normalizeEmail(request.getEmail());
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already exists");
        }

        Couple couple = resolveCouple(request.getInviteCode());

        User user = User.builder()
                .name(request.getName().trim())
                .email(email)
                .password(passwordEncoder.encode(request.getPassword()))
                .couple(couple)
                .build();
        User savedUser = userRepository.save(user);

        return AuthResponse.of(createToken(savedUser), UserResponse.from(savedUser));
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(normalizeEmail(request.getEmail()))
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        return AuthResponse.of(createToken(user), UserResponse.from(user));
    }

    public UserResponse me(String authorization) {
        return UserResponse.from(getUserFromAuthorization(authorization));
    }

    public User getUserFromAuthorization(String authorization) {
        Long userId = parseUserIdFromAuthorization(authorization);
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    private Couple resolveCouple(String inviteCode) {
        if (inviteCode == null || inviteCode.isBlank()) {
            return coupleRepository.save(Couple.builder().inviteCode(generateInviteCode()).build());
        }

        Couple couple = coupleRepository.findByInviteCode(inviteCode.trim().toUpperCase())
                .orElseThrow(() -> new IllegalArgumentException("Invalid invite code"));

        if (userRepository.countByCoupleId(couple.getId()) >= 2) {
            throw new IllegalArgumentException("This couple already has two members");
        }
        return couple;
    }

    private String normalizeEmail(String email) {
        return email.trim().toLowerCase();
    }

    private String createToken(User user) {
        // MVP token. It is simple and easy to debug. Later, replace with real JWT.
        return "user-" + user.getId();
    }

    private Long parseUserIdFromAuthorization(String authorization) {
        if (authorization == null || !authorization.startsWith("Bearer user-")) {
            throw new IllegalArgumentException("Missing or invalid token. Please login again.");
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
