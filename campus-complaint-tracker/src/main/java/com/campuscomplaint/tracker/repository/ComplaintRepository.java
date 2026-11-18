package com.campuscomplaint.tracker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.campuscomplaint.tracker.entity.Complaint;

public interface ComplaintRepository
        extends JpaRepository<Complaint, Long> {

    long countByStatusIgnoreCase(String status);

    long countByEscalatedAtIsNotNull();

    List<Complaint> findByEscalatedAtIsNotNullOrderByEscalatedAtDesc();

    List<Complaint> findByStatusIgnoreCaseOrderByCreatedAtDesc(String status);

    // Get complaints belonging to a particular student
    List<Complaint> findByStudent_EmailOrderByCreatedAtDesc(String email);
}