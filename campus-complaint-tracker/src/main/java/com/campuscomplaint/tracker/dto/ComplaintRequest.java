package com.campuscomplaint.tracker.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ComplaintRequest {


@NotBlank(message = "Title is required")
@Size(max = 150, message = "Title cannot exceed 150 characters")
private String title;

@NotBlank(message = "Description is required")
@Size(max = 2000, message = "Description cannot exceed 2000 characters")
private String description;

@NotBlank(message = "Category is required")
private String category;

@NotBlank(message = "Severity is required")
private String severity;

@Email(message = "Enter a valid student email")
private String studentEmail;

public ComplaintRequest() {
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

public String getStudentEmail() {
    return studentEmail;
}

public void setStudentEmail(String studentEmail) {
    this.studentEmail = studentEmail;
}


}
