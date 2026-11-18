package com.campuscomplaint.tracker.dto;

import java.time.LocalDateTime;

public class ComplaintResponse {

    private Long id;
    private String title;
    private String description;
    private String category;
    private String severity;
    private String status;
    private int priorityScore;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime escalatedAt;

    public ComplaintResponse(
            Long id,
            String title,
            String description,
            String category,
            String severity,
            String status,
            int priorityScore,
            LocalDateTime createdAt,
            LocalDateTime updatedAt,
            LocalDateTime escalatedAt) {

        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.severity = severity;
        this.status = status;
        this.priorityScore = priorityScore;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.escalatedAt = escalatedAt;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public LocalDateTime getEscalatedAt() {
        return escalatedAt;
    }
}