package com.campuscomplaint.tracker.dto;

import java.time.LocalDateTime;

public class ComplaintSummaryResponse {


private Long id;
private String title;
private String description;
private String category;
private String severity;
private String status;
private int priorityScore;
private LocalDateTime createdAt;
private LocalDateTime escalatedAt;

private String studentName;
private String assignedStaffName;
private String assignedStaffEmail;

public ComplaintSummaryResponse(
        Long id,
        String title,
        String description,
        String category,
        String severity,
        String status,
        int priorityScore,
        LocalDateTime createdAt,
        LocalDateTime escalatedAt,
        String studentName,
        String assignedStaffName,
        String assignedStaffEmail) {

    this.id = id;
    this.title = title;
    this.description = description;
    this.category = category;
    this.severity = severity;
    this.status = status;
    this.priorityScore = priorityScore;
    this.createdAt = createdAt;
    this.escalatedAt = escalatedAt;

    this.studentName = studentName;
    this.assignedStaffName = assignedStaffName;
    this.assignedStaffEmail = assignedStaffEmail;
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

public LocalDateTime getEscalatedAt() {
    return escalatedAt;
}

public String getStudentName() {
    return studentName;
}

public String getAssignedStaffName() {
    return assignedStaffName;
}

public String getAssignedStaffEmail() {
    return assignedStaffEmail;
}

}
