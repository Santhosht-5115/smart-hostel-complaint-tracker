package com.campuscomplaint.tracker.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.campuscomplaint.tracker.entity.Staff;
import com.campuscomplaint.tracker.entity.ComplaintAssignment;

public interface StaffRepository extends JpaRepository<Staff, Long> {

    Optional<Staff> findByEmail(String email);

    @Query("""
        SELECT s
        FROM Staff s
        WHERE s.active = true
          AND UPPER(s.category) = UPPER(:category)
        ORDER BY (
            SELECT COUNT(a.id)
            FROM ComplaintAssignment a
            WHERE a.staff = s
              AND a.unassignedAt IS NULL
              AND a.complaint.status <> 'RESOLVED'
        ) ASC, s.id ASC
        """)
    List<Staff> findAvailableStaffByLowestWorkload(
            @Param("category") String category);
}