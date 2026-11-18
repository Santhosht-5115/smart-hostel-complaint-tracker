package com.campuscomplaint.tracker.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.campuscomplaint.tracker.dto.LoginRequest;
import com.campuscomplaint.tracker.dto.RegisterRequest;
import com.campuscomplaint.tracker.entity.User;
import com.campuscomplaint.tracker.repository.UserRepository;

@Service
public class AuthService {


private final UserRepository userRepository;
private final PasswordEncoder passwordEncoder;

public AuthService(
        UserRepository userRepository,
        PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
}

public String register(RegisterRequest request) {

    if (userRepository.existsByEmail(request.getEmail())) {
        throw new IllegalArgumentException(
                "Email is already registered");
    }

    User user = new User();

    user.setName(request.getName());
    user.setEmail(request.getEmail());
    user.setPassword(
            passwordEncoder.encode(request.getPassword()));
    user.setRole("STUDENT");

    userRepository.save(user);

    return "Student registered successfully";
}

public String login(LoginRequest request) {

    User user = userRepository
            .findByEmail(request.getEmail())
            .orElseThrow(() -> new IllegalArgumentException(
                    "Invalid email or password"));

    if (!passwordEncoder.matches(
            request.getPassword(), user.getPassword())) {

        throw new IllegalArgumentException(
                "Invalid email or password");
    }

    return "Login successful";
}


}
