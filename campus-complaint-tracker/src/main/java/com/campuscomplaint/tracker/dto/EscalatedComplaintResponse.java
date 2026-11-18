package com.campuscomplaint.tracker.dto;

import java.time.LocalDateTime;

public class EscalatedComplaintResponse {

    private Long id;
    private String title;
    private String category;
    private String severity;
    private String status;
    private int priorityScore;
    private LocalDateTime createdAt;
    private LocalDateTime escalatedAt;

    public EscalatedComplaintResponse() {
    }

    public EscalatedComplaintResponse(
            Long id,
            String title,
            String category,
            String severity,
            String status,
            int priorityScore,
            LocalDateTime createdAt,
            LocalDateTime escalatedAt) {

        this.id = id;
        this.title = title;
        this.category = category;
        this.severity = severity;
        this.status = status;
        this.priorityScore = priorityScore;
        this.createdAt = createdAt;
        this.escalatedAt = escalatedAt;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
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

    public LocalDateTime getEscalatedAt() {
        return escalatedAt;
    }
}