package com.campuscomplaint.tracker.dto;

public class StaffWorkloadResponse {

    private long totalAssigned;
    private long raised;
    private long inProgress;
    private long resolved;
    private long escalated;

    public StaffWorkloadResponse(
            long totalAssigned,
            long raised,
            long inProgress,
            long resolved,
            long escalated) {

        this.totalAssigned = totalAssigned;
        this.raised = raised;
        this.inProgress = inProgress;
        this.resolved = resolved;
        this.escalated = escalated;
    }

    public long getTotalAssigned() {
        return totalAssigned;
    }

    public long getRaised() {
        return raised;
    }

    public long getInProgress() {
        return inProgress;
    }

    public long getResolved() {
        return resolved;
    }

    public long getEscalated() {
        return escalated;
    }
}