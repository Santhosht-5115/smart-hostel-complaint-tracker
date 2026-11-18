package com.campuscomplaint.tracker.dto;

import jakarta.validation.constraints.NotBlank;

public class UpdateComplaintStatusRequest {


@NotBlank(message = "Status is required")
private String status;

public UpdateComplaintStatusRequest() {
}

public String getStatus() {
    return status;
}

public void setStatus(String status) {
    this.status = status;
}


}
