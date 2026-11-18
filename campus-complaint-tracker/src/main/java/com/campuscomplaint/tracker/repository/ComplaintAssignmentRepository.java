package com.campuscomplaint.tracker.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.campuscomplaint.tracker.entity.ComplaintAssignment;

public interface ComplaintAssignmentRepository
        extends JpaRepository<ComplaintAssignment, Long> {

    Optional<ComplaintAssignment>
    findFirstByComplaint_IdAndUnassignedAtIsNullOrderByAssignedAtDesc(
            Long complaintId);

    List<ComplaintAssignment>
    findByStaff_EmailAndUnassignedAtIsNullOrderByAssignedAtDesc(
            String email);

    Optional<ComplaintAssignment>
    findFirstByComplaint_IdAndStaff_EmailAndUnassignedAtIsNullOrderByAssignedAtDesc(
            Long complaintId, String email);
}