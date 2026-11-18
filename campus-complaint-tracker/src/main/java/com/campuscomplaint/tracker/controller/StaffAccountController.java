package com.campuscomplaint.tracker.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.campuscomplaint.tracker.dto.StaffAccountRequest;
import com.campuscomplaint.tracker.service.StaffAccountService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin/dashboard/staff-accounts")
public class StaffAccountController {

    private final StaffAccountService staffAccountService;

    public StaffAccountController(
            StaffAccountService staffAccountService) {

        this.staffAccountService = staffAccountService;
    }

    // Get all staff members and their account status
    @GetMapping
    public ResponseEntity<?> getAllStaffAccounts() {

        return ResponseEntity.ok(
                staffAccountService.getAllStaffAccounts()
        );
    }

    // Create a staff login account
    @PostMapping
    public ResponseEntity<?> createStaffAccount(
            @Valid @RequestBody StaffAccountRequest request) {

        try {

            String result = staffAccountService.createStaffAccount(
                    request.getEmail(),
                    request.getPassword()
            );

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Map.of("message", result));

        } catch (IllegalArgumentException e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }
}