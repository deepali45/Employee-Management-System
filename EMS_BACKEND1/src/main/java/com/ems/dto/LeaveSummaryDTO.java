package com.ems.dto;

public class LeaveSummaryDTO {
    private long totalLeaveRequests;
    private long approvedLeaves;
    private long pendingLeaves;
    private long rejectedLeaves;
    private long cancelledLeaves;

    // Getters and Setters
    public long getTotalLeaveRequests() {
        return totalLeaveRequests;
    }

    public void setTotalLeaveRequests(long totalLeaveRequests) {
        this.totalLeaveRequests = totalLeaveRequests;
    }

    public long getApprovedLeaves() {
        return approvedLeaves;
    }

    public void setApprovedLeaves(long approvedLeaves) {
        this.approvedLeaves = approvedLeaves;
    }

    public long getPendingLeaves() {
        return pendingLeaves;
    }

    public void setPendingLeaves(long pendingLeaves) {
        this.pendingLeaves = pendingLeaves;
    }

    public long getRejectedLeaves() {
        return rejectedLeaves;
    }

    public void setRejectedLeaves(long rejectedLeaves) {
        this.rejectedLeaves = rejectedLeaves;
    }

    public long getCancelledLeaves() {
        return cancelledLeaves;
    }

    public void setCancelledLeaves(long cancelledLeaves) {
        this.cancelledLeaves = cancelledLeaves;
    }
}
