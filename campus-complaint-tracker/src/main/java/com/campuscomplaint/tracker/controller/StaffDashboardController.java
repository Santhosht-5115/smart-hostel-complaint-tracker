package com.campuscomplaint.tracker.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import com.campuscomplaint.tracker.dto.StaffComplaintResponse;
import com.campuscomplaint.tracker.dto.StaffComplaintStatusRequest;
import com.campuscomplaint.tracker.dto.StaffWorkloadResponse;
import com.campuscomplaint.tracker.service.StaffDashboardService;

@RestController
@RequestMapping("/api/staff")
public class StaffDashboardController {

    private final StaffDashboardService staffDashboardService;

    public StaffDashboardController(
            StaffDashboardService staffDashboardService) {

        this.staffDashboardService = staffDashboardService;
    }

    // View assigned complaints

    @GetMapping("/complaints")
    public ResponseEntity<List<StaffComplaintResponse>> getAssignedComplaints(
            Authentication authentication,
            @RequestParam(required = false) String status) {

        String staffEmail = authentication.getName();

        List<StaffComplaintResponse> complaints =
                staffDashboardService.getAssignedComplaints(
                        staffEmail, status);

        return ResponseEntity.ok(complaints);
    }

    // Update assigned complaint status

    @PatchMapping("/complaints/{complaintId}/status")
    public ResponseEntity<?> updateComplaintStatus(
            @PathVariable Long complaintId,
            @Valid @RequestBody StaffComplaintStatusRequest request,
            Authentication authentication) {

        try {

            String staffEmail = authentication.getName();

            String message =
                    staffDashboardService.updateComplaintStatus(
                            complaintId,
                            staffEmail,
                            request.getStatus());

            return ResponseEntity.ok(
                    Map.of("message", message));

        } catch (IllegalArgumentException e) {

            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    // View workload

    @GetMapping("/workload")
    public ResponseEntity<StaffWorkloadResponse> getWorkload(
            Authentication authentication) {

        String staffEmail = authentication.getName();

        StaffWorkloadResponse workload =
                staffDashboardService.getWorkload(staffEmail);

        return ResponseEntity.ok(workload);
    }
}