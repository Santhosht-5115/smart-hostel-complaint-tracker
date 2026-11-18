package com.campuscomplaint.tracker.dto;

public class StaffAccountResponse {

    private Long staffId;
    private String name;
    private String email;
    private String category;
    private boolean active;
    private boolean accountCreated;

    public StaffAccountResponse(
            Long staffId,
            String name,
            String email,
            String category,
            boolean active,
            boolean accountCreated) {

        this.staffId = staffId;
        this.name = name;
        this.email = email;
        this.category = category;
        this.active = active;
        this.accountCreated = accountCreated;
    }

    public Long getStaffId() {
        return staffId;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getCategory() {
        return category;
    }

    public boolean isActive() {
        return active;
    }

    public boolean isAccountCreated() {
        return accountCreated;
    }
}