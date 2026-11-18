package com.campuscomplaint.tracker.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.campuscomplaint.tracker.dto.ComplaintRequest;
import com.campuscomplaint.tracker.entity.Complaint;
import com.campuscomplaint.tracker.entity.ComplaintAssignment;
import com.campuscomplaint.tracker.entity.User;
import com.campuscomplaint.tracker.repository.ComplaintRepository;
import com.campuscomplaint.tracker.repository.UserRepository;

@Service
public class ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final UserRepository userRepository;
    private final PriorityService priorityService;
    private final AssignmentService assignmentService;

    public ComplaintService(
            ComplaintRepository complaintRepository,
            UserRepository userRepository,
            PriorityService priorityService,
            AssignmentService assignmentService) {

        this.complaintRepository = complaintRepository;
        this.userRepository = userRepository;
        this.priorityService = priorityService;
        this.assignmentService = assignmentService;
    }

    @Transactional
    public Complaint createComplaint(ComplaintRequest request) {

        // 1. Find the student
        User student = userRepository
                .findByEmail(request.getStudentEmail().trim())
                .orElseThrow(() -> new IllegalArgumentException(
                        "Student not found. Please register first."));

        // 2. Validate complaint category
        String category = request.getCategory().trim().toUpperCase();

        if (!category.matches(
                "WIFI|ELECTRICITY|WATER|PLUMBING|CLEANING|OTHER")) {

            throw new IllegalArgumentException(
                    "Invalid complaint category.");
        }

        // 3. Validate severity
        String severity = request.getSeverity().trim().toUpperCase();

        if (!severity.matches("LOW|MEDIUM|HIGH|CRITICAL")) {

            throw new IllegalArgumentException(
                    "Invalid severity. Use LOW, MEDIUM, HIGH, or CRITICAL.");
        }

        // 4. Create the complaint
        Complaint complaint = new Complaint();

        complaint.setTitle(request.getTitle().trim());
        complaint.setDescription(request.getDescription().trim());
        complaint.setCategory(category);
        complaint.setSeverity(severity);
        complaint.setStudent(student);
        complaint.setStatus("RAISED");

        // 5. Save the complaint to generate its ID
        Complaint savedComplaint = complaintRepository.save(complaint);

        // 6. Calculate and save the initial priority score
        int priorityScore =
                priorityService.calculatePriorityScore(savedComplaint);

        savedComplaint.setPriorityScore(priorityScore);

        savedComplaint = complaintRepository.save(savedComplaint);

        // 7. Automatically assign the complaint to eligible staff
        ComplaintAssignment assignment =
                assignmentService.assignComplaint(savedComplaint);

        // 8. Return the saved complaint
        return savedComplaint;
    }
    
    @Transactional
    public Complaint updateComplaintStatus(Long complaintId, String newStatus) {

        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Complaint not found with ID: " + complaintId));

        String status = newStatus.trim().toUpperCase();

        if (!status.matches("RAISED|IN_PROGRESS|RESOLVED")) {
            throw new IllegalArgumentException(
                    "Invalid status. Use RAISED, IN_PROGRESS, or RESOLVED.");
        }

        complaint.setStatus(status);

        return complaintRepository.save(complaint);
    }
}
