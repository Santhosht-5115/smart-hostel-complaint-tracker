package com.campuscomplaint.tracker.controller;

import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/auth")
public class LogoutController {

    private final SecurityContextLogoutHandler logoutHandler =
            new SecurityContextLogoutHandler();

    @PostMapping("/logout")
    public Map<String, String> logout(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication) {

        logoutHandler.logout(request, response, authentication);

        return Map.of(
                "message", "Logout successful"
        );
    }
}