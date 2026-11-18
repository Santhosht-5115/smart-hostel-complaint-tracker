package com.campuscomplaint.tracker.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.campuscomplaint.tracker.service.AdminDashboardService;

import java.util.List;

import com.campuscomplaint.tracker.dto.EscalatedComplaintResponse;

import org.springframework.web.bind.annotation.RequestParam;

import com.campuscomplaint.tracker.dto.ComplaintSummaryResponse;

@RestController
@RequestMapping("/api/admin/dashboard")
public class AdminDashboardController {

    private final AdminDashboardService adminDashboardService;

    public AdminDashboardController(
            AdminDashboardService adminDashboardService) {
        this.adminDashboardService = adminDashboardService;
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Long>> getDashboardStats() {

        Map<String, Long> stats =
                adminDashboardService.getDashboardStats();

        return ResponseEntity.ok(stats);
    }
    
    @GetMapping("/escalated")
    public ResponseEntity<List<EscalatedComplaintResponse>>
            getEscalatedComplaints() {

        List<EscalatedComplaintResponse> complaints =
                adminDashboardService.getEscalatedComplaints();

        return ResponseEntity.ok(complaints);
    }
    
    @GetMapping("/complaints")
    public ResponseEntity<?> getComplaintsByStatus(
            @RequestParam String status) {

        String normalizedStatus = status.trim().toUpperCase();

        if (!normalizedStatus.matches("RAISED|IN_PROGRESS|RESOLVED")) {
            return ResponseEntity.badRequest().body(
                    Map.of(
                            "error",
                            "Invalid status. Use RAISED, IN_PROGRESS, or RESOLVED."
                    )
            );
        }

        List<ComplaintSummaryResponse> complaints =
                adminDashboardService.getComplaintsByStatus(
                        normalizedStatus);

        return ResponseEntity.ok(complaints);
    }
}