package com.ems.dto;

public class AttendanceSummaryDTO {
    private long totalPresent;
    private long totalAbsent;
    private long totalHalfDay;
    private long totalLeave; // Employees on leave
    private long totalHoliday;

    // Getters and Setters
    public long getTotalPresent() {
        return totalPresent;
    }

    public void setTotalPresent(long totalPresent) {
        this.totalPresent = totalPresent;
    }

    public long getTotalAbsent() {
        return totalAbsent;
    }

    public void setTotalAbsent(long totalAbsent) {
        this.totalAbsent = totalAbsent;
    }

    public long getTotalHalfDay() {
        return totalHalfDay;
    }

    public void setTotalHalfDay(long totalHalfDay) {
        this.totalHalfDay = totalHalfDay;
    }

    public long getTotalLeave() {
        return totalLeave;
    }

    public void setTotalLeave(long totalLeave) {
        this.totalLeave = totalLeave;
    }

    public long getTotalHoliday() {
        return totalHoliday;
    }

    public void setTotalHoliday(long totalHoliday) {
        this.totalHoliday = totalHoliday;
    }
}
