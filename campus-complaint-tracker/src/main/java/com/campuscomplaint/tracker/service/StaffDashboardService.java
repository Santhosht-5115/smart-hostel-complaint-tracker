package com.campuscomplaint.tracker.service;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.campuscomplaint.tracker.dto.StaffComplaintResponse;
import com.campuscomplaint.tracker.dto.StaffWorkloadResponse;
import com.campuscomplaint.tracker.entity.Complaint;
import com.campuscomplaint.tracker.entity.ComplaintAssignment;
import com.campuscomplaint.tracker.repository.ComplaintAssignmentRepository;
import com.campuscomplaint.tracker.repository.ComplaintRepository;

@Service
public class StaffDashboardService {

    private final ComplaintAssignmentRepository assignmentRepository;
    private final ComplaintRepository complaintRepository;

    public StaffDashboardService(
            ComplaintAssignmentRepository assignmentRepository,
            ComplaintRepository complaintRepository) {

        this.assignmentRepository = assignmentRepository;
        this.complaintRepository = complaintRepository;
    }

    // Get complaints assigned to the logged-in staff member

    @Transactional(readOnly = true)
    public List<StaffComplaintResponse> getAssignedComplaints(
            String staffEmail, String status) {

        List<ComplaintAssignment> assignments =
                assignmentRepository
                .findByStaff_EmailAndUnassignedAtIsNullOrderByAssignedAtDesc(
                        staffEmail);

        return assignments.stream()

                .map(this::convertToResponse)

                .filter(complaint -> status == null
                        || status.isBlank()
                        || complaint.getStatus().equalsIgnoreCase(status))

                .collect(Collectors.toList());
    }

    // Convert assignment entity into response DTO

    private StaffComplaintResponse convertToResponse(
            ComplaintAssignment assignment) {

        Complaint complaint = assignment.getComplaint();

        return new StaffComplaintResponse(
                complaint.getId(),
                complaint.getTitle(),
                complaint.getDescription(),
                complaint.getCategory(),
                complaint.getSeverity(),
                complaint.getStatus(),
                complaint.getPriorityScore(),
                complaint.getStudent().getName(),
                complaint.getStudent().getEmail(),
                complaint.getCreatedAt(),
                complaint.getUpdatedAt(),
                complaint.getEscalatedAt(),
                assignment.getAssignedAt()
        );
    }

    // Update status only if the complaint belongs to this staff member

    @Transactional
    public String updateComplaintStatus(
            Long complaintId,
            String staffEmail,
            String newStatus) {

        if (newStatus == null) {
            throw new IllegalArgumentException("Status is required");
        }

        String status = newStatus.trim().toUpperCase(Locale.ROOT);

        if (!status.matches("RAISED|IN_PROGRESS|RESOLVED")) {
            throw new IllegalArgumentException("Invalid complaint status");
        }

        ComplaintAssignment assignment =
                assignmentRepository
                .findFirstByComplaint_IdAndStaff_EmailAndUnassignedAtIsNullOrderByAssignedAtDesc(
                        complaintId, staffEmail)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "This complaint is not assigned to you"));

        Complaint complaint = assignment.getComplaint();

        complaint.setStatus(status);
        complaint.updateTimestamp();

        complaintRepository.save(complaint);

        return "Complaint status updated successfully";
    }

    // Get workload statistics

    @Transactional(readOnly = true)
    public StaffWorkloadResponse getWorkload(String staffEmail) {

        List<ComplaintAssignment> assignments =
                assignmentRepository
                .findByStaff_EmailAndUnassignedAtIsNullOrderByAssignedAtDesc(
                        staffEmail);

        long total = assignments.size();

        long raised = 0;
        long inProgress = 0;
        long resolved = 0;
        long escalated = 0;

        for (ComplaintAssignment assignment : assignments) {

            Complaint complaint = assignment.getComplaint();

            String status = complaint.getStatus();

            if ("RAISED".equalsIgnoreCase(status)) {
                raised++;
            }

            if ("IN_PROGRESS".equalsIgnoreCase(status)) {
                inProgress++;
            }

            if ("RESOLVED".equalsIgnoreCase(status)) {
                resolved++;
            }

            if (complaint.getEscalatedAt() != null) {
                escalated++;
            }
        }

        return new StaffWorkloadResponse(
                total,
                raised,
                inProgress,
                resolved,
                escalated
        );
    }
}