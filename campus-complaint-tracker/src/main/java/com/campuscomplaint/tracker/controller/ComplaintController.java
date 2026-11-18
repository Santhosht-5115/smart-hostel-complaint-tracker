package com.campuscomplaint.tracker.controller;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.campuscomplaint.tracker.dto.ComplaintRequest;
import com.campuscomplaint.tracker.dto.ComplaintResponse;
import com.campuscomplaint.tracker.entity.Complaint;
import com.campuscomplaint.tracker.repository.ComplaintRepository;
import com.campuscomplaint.tracker.service.ComplaintService;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {

    private final ComplaintService complaintService;
    private final ComplaintRepository complaintRepository;

    public ComplaintController(
            ComplaintService complaintService,
            ComplaintRepository complaintRepository) {

        this.complaintService = complaintService;
        this.complaintRepository = complaintRepository;
    }

    // Submit a new complaint
    @PostMapping
    public ResponseEntity<?> createComplaint(
            @Valid @RequestBody ComplaintRequest request,
            Authentication authentication) {

        try {
            String studentEmail = authentication.getName();

            request.setStudentEmail(studentEmail);

            Complaint complaint =
                    complaintService.createComplaint(request);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Complaint submitted successfully. Complaint ID: "
                            + complaint.getId());

        } catch (IllegalArgumentException e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    // Get complaints submitted by the logged-in student
    @GetMapping("/my")
    public ResponseEntity<List<ComplaintResponse>> getMyComplaints(
            Authentication authentication) {

        String studentEmail = authentication.getName();

        List<ComplaintResponse> responses =
                complaintRepository
                        .findByStudent_EmailOrderByCreatedAtDesc(studentEmail)
                        .stream()
                        .map(complaint -> new ComplaintResponse(
                                complaint.getId(),
                                complaint.getTitle(),
                                complaint.getDescription(),
                                complaint.getCategory(),
                                complaint.getSeverity(),
                                complaint.getStatus(),
                                complaint.getPriorityScore(),
                                complaint.getCreatedAt(),
                                complaint.getUpdatedAt(),
                                complaint.getEscalatedAt()
                        ))
                        .toList();

        return ResponseEntity.ok(responses);
    }
}