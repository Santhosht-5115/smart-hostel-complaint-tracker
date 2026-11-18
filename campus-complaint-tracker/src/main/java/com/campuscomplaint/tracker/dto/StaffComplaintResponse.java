package com.campuscomplaint.tracker.dto;

import java.time.LocalDateTime;

public class StaffComplaintResponse {

    private Long id;
    private String title;
    private String description;
    private String category;
    private String severity;
    private String status;
    private int priorityScore;

    private String studentName;
    private String studentEmail;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime escalatedAt;
    private LocalDateTime assignedAt;

    public StaffComplaintResponse(
            Long id,
            String title,
            String description,
            String category,
            String severity,
            String status,
            int priorityScore,
            String studentName,
            String studentEmail,
            LocalDateTime createdAt,
            LocalDateTime updatedAt,
            LocalDateTime escalatedAt,
            LocalDateTime assignedAt) {

        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.severity = severity;
        this.status = status;
        this.priorityScore = priorityScore;
        this.studentName = studentName;
        this.studentEmail = studentEmail;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.escalatedAt = escalatedAt;
        this.assignedAt = assignedAt;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getCategory() {
        return category;
    }

    public String getSeverity() {
        return severity;
    }

    public String getStatus() {
        return status;
    }

    public int getPriorityScore() {
        return priorityScore;
    }

    public String getStudentName() {
        return studentName;
    }

    public String getStudentEmail() {
        return studentEmail;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public LocalDateTime getEscalatedAt() {
        return escalatedAt;
    }

    public LocalDateTime getAssignedAt() {
        return assignedAt;
    }
}