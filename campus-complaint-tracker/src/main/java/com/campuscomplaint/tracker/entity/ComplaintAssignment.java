package com.campuscomplaint.tracker.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.PrePersist;

@Entity
@Table(name = "complaint_assignments")
public class ComplaintAssignment {


@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "complaint_id", nullable = false)
private Complaint complaint;

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "staff_id", nullable = false)
private Staff staff;

private LocalDateTime assignedAt;

private LocalDateTime unassignedAt;

public ComplaintAssignment() {
}

@PrePersist
public void onCreate() {
    assignedAt = LocalDateTime.now();
}

public Long getId() {
    return id;
}

public void setId(Long id) {
    this.id = id;
}

public Complaint getComplaint() {
    return complaint;
}

public void setComplaint(Complaint complaint) {
    this.complaint = complaint;
}

public Staff getStaff() {
    return staff;
}

public void setStaff(Staff staff) {
    this.staff = staff;
}

public LocalDateTime getAssignedAt() {
    return assignedAt;
}

public void setAssignedAt(LocalDateTime assignedAt) {
    this.assignedAt = assignedAt;
}

public LocalDateTime getUnassignedAt() {
    return unassignedAt;
}

public void setUnassignedAt(LocalDateTime unassignedAt) {
    this.unassignedAt = unassignedAt;
}

}

