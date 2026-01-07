package com.ems.dto;

public class DashboardOverviewDTO {
    private long totalEmployees;
    private long employeesOnLeave;
    private long pendingLeaveRequests;
    private long employeesPresentToday;
    private long totalTasks;
    private long pendingTasks;
    private long completedTasks;

    // Getters and Setters
    public long getTotalEmployees() {
        return totalEmployees;
    }

    public void setTotalEmployees(long totalEmployees) {
        this.totalEmployees = totalEmployees;
    }

    public long getEmployeesOnLeave() {
        return employeesOnLeave;
    }

    public void setEmployeesOnLeave(long employeesOnLeave) {
        this.employeesOnLeave = employeesOnLeave;
    }

    public long getPendingLeaveRequests() {
        return pendingLeaveRequests;
    }

    public void setPendingLeaveRequests(long pendingLeaveRequests) {
        this.pendingLeaveRequests = pendingLeaveRequests;
    }

    public long getEmployeesPresentToday() {
        return employeesPresentToday;
    }

    public void setEmployeesPresentToday(long employeesPresentToday) {
        this.employeesPresentToday = employeesPresentToday;
    }

    public long getTotalTasks() {
        return totalTasks;
    }

    public void setTotalTasks(long totalTasks) {
        this.totalTasks = totalTasks;
    }

    public long getPendingTasks() {
        return pendingTasks;
    }

    public void setPendingTasks(long pendingTasks) {
        this.pendingTasks = pendingTasks;
    }

    public long getCompletedTasks() {
        return completedTasks;
    }

    public void setCompletedTasks(long completedTasks) {
        this.completedTasks = completedTasks;
    }
}
