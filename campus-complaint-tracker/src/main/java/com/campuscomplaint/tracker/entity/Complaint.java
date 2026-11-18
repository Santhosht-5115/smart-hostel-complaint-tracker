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
@Table(name = "complaints")
public class Complaint {


@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

private String title;

private String description;

private String category;

private String severity;

private String status = "RAISED";

private int priorityScore;

private LocalDateTime createdAt;

private LocalDateTime updatedAt;

private LocalDateTime escalatedAt;

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "student_id", nullable = false)
private User student;

public Complaint() {
}

@PrePersist
public void onCreate() {
    createdAt = LocalDateTime.now();
    updatedAt = createdAt;
}

public void updateTimestamp() {
    updatedAt = LocalDateTime.now();
}

public Long getId() {
    return id;
}

public void setId(Long id) {
    this.id = id;
}

public String getTitle() {
    return title;
}

public void setTitle(String title) {
    this.title = title;
}

public String getDescription() {
    return description;
}

public void setDescription(String description) {
    this.description = description;
}

public String getCategory() {
    return category;
}

public void setCategory(String category) {
    this.category = category;
}

public String getSeverity() {
    return severity;
}

public void setSeverity(String severity) {
    this.severity = severity;
}

public String getStatus() {
    return status;
}

public void setStatus(String status) {
    this.status = status;
}

public int getPriorityScore() {
    return priorityScore;
}

public void setPriorityScore(int priorityScore) {
    this.priorityScore = priorityScore;
}

public LocalDateTime getCreatedAt() {
    return createdAt;
}

public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
}

public LocalDateTime getUpdatedAt() {
    return updatedAt;
}

public void setUpdatedAt(LocalDateTime updatedAt) {
    this.updatedAt = updatedAt;
}

public LocalDateTime getEscalatedAt() {
    return escalatedAt;
}

public void setEscalatedAt(LocalDateTime escalatedAt) {
    this.escalatedAt = escalatedAt;
}

public User getStudent() {
    return student;
}

public void setStudent(User student) {
    this.student = student;
}


}
