package com.campuscomplaint.tracker.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.campuscomplaint.tracker.dto.ComplaintSummaryResponse;
import com.campuscomplaint.tracker.dto.EscalatedComplaintResponse;
import com.campuscomplaint.tracker.entity.Complaint;
import com.campuscomplaint.tracker.entity.ComplaintAssignment;
import com.campuscomplaint.tracker.entity.Staff;
import com.campuscomplaint.tracker.entity.User;
import com.campuscomplaint.tracker.repository.ComplaintAssignmentRepository;
import com.campuscomplaint.tracker.repository.ComplaintRepository;

@Service
public class AdminDashboardService {


private final ComplaintRepository complaintRepository;

private final ComplaintAssignmentRepository complaintAssignmentRepository;

public AdminDashboardService(
        ComplaintRepository complaintRepository,
        ComplaintAssignmentRepository complaintAssignmentRepository) {

    this.complaintRepository = complaintRepository;
    this.complaintAssignmentRepository =
            complaintAssignmentRepository;
}

public Map<String, Long> getDashboardStats() {

    long totalComplaints = complaintRepository.count();

    long raisedComplaints =
            complaintRepository.countByStatusIgnoreCase("RAISED");

    long inProgressComplaints =
            complaintRepository.countByStatusIgnoreCase("IN_PROGRESS");

    long resolvedComplaints =
            complaintRepository.countByStatusIgnoreCase("RESOLVED");

    long escalatedComplaints =
            complaintRepository.countByEscalatedAtIsNotNull();

    return Map.of(
            "totalComplaints", totalComplaints,
            "raisedComplaints", raisedComplaints,
            "inProgressComplaints", inProgressComplaints,
            "resolvedComplaints", resolvedComplaints,
            "escalatedComplaints", escalatedComplaints
    );
}

public List<EscalatedComplaintResponse> getEscalatedComplaints() {

    List<Complaint> complaints =
            complaintRepository
                    .findByEscalatedAtIsNotNullOrderByEscalatedAtDesc();

    return complaints.stream()
            .map(complaint -> new EscalatedComplaintResponse(
                    complaint.getId(),
                    complaint.getTitle(),
                    complaint.getCategory(),
                    complaint.getSeverity(),
                    complaint.getStatus(),
                    complaint.getPriorityScore(),
                    complaint.getCreatedAt(),
                    complaint.getEscalatedAt()
            ))
            .collect(Collectors.toList());
}

@Transactional(readOnly = true)
public List<ComplaintSummaryResponse> getComplaintsByStatus(
        String status) {

    List<Complaint> complaints =
            complaintRepository
                    .findByStatusIgnoreCaseOrderByCreatedAtDesc(status);

    return complaints.stream()
            .map(this::convertToComplaintSummaryResponse)
            .collect(Collectors.toList());
}

private ComplaintSummaryResponse convertToComplaintSummaryResponse(
        Complaint complaint) {

    String studentName = "Not provided";

    User student = complaint.getStudent();

    if (student != null && student.getName() != null) {
        studentName = student.getName();
    }

    String assignedStaffName = "Not Assigned";
    String assignedStaffEmail = "Not Assigned";


    ComplaintAssignment assignment =
            complaintAssignmentRepository
                    .findFirstByComplaint_IdAndUnassignedAtIsNullOrderByAssignedAtDesc(
                            complaint.getId())
                    .orElse(null);

    if (assignment != null && assignment.getStaff() != null) {

        Staff staff = assignment.getStaff();

        assignedStaffName =
                staff.getName() != null
                        ? staff.getName()
                        : "Not Assigned";

        assignedStaffEmail =
                staff.getEmail() != null
                        ? staff.getEmail()
                        : "Not Assigned";
    }

    return new ComplaintSummaryResponse(
            complaint.getId(),
            complaint.getTitle(),
            complaint.getDescription(),
            complaint.getCategory(),
            complaint.getSeverity(),
            complaint.getStatus(),
            complaint.getPriorityScore(),
            complaint.getCreatedAt(),
            complaint.getEscalatedAt(),
            studentName,
            assignedStaffName,
            assignedStaffEmail
    );
}

}
