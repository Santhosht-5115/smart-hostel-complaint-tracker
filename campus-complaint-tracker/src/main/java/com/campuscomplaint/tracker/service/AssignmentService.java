package com.campuscomplaint.tracker.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.campuscomplaint.tracker.entity.Complaint;
import com.campuscomplaint.tracker.entity.ComplaintAssignment;
import com.campuscomplaint.tracker.entity.Staff;
import com.campuscomplaint.tracker.repository.ComplaintAssignmentRepository;
import com.campuscomplaint.tracker.repository.StaffRepository;

@Service
public class AssignmentService {


private final StaffRepository staffRepository;
private final ComplaintAssignmentRepository assignmentRepository;

public AssignmentService(
        StaffRepository staffRepository,
        ComplaintAssignmentRepository assignmentRepository) {
    this.staffRepository = staffRepository;
    this.assignmentRepository = assignmentRepository;
}

@Transactional
public ComplaintAssignment assignComplaint(Complaint complaint) {

    if (complaint == null || complaint.getId() == null) {
        throw new IllegalArgumentException(
                "A saved complaint is required for assignment.");
    }

    List<Staff> availableStaff =
            staffRepository.findAvailableStaffByLowestWorkload(
                    complaint.getCategory());

    if (availableStaff.isEmpty()) {
        throw new IllegalStateException(
                "No active staff member is available for category: "
                        + complaint.getCategory());
    }

    Staff selectedStaff = availableStaff.get(0);

    ComplaintAssignment assignment = new ComplaintAssignment();
    assignment.setComplaint(complaint);
    assignment.setStaff(selectedStaff);

    return assignmentRepository.save(assignment);
}

}
