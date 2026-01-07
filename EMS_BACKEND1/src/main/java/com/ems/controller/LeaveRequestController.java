package com.ems.controller;

import com.ems.dto.LeaveRequestDTO;
import com.ems.service.LeaveRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/leave-requests")
public class LeaveRequestController {

    @Autowired
    private LeaveRequestService leaveRequestService;

    // Employee can create a leave request
    @PreAuthorize("hasAnyAuthority('ROLE_EMPLOYEE', 'ROLE_ADMIN', 'ROLE_HR')")
    @PostMapping
    public ResponseEntity<LeaveRequestDTO> createLeaveRequest(@RequestBody LeaveRequestDTO leaveRequestDTO, Principal principal) {
        // Ensure employee can only create for themselves
        // In a real app, you'd get employee ID from principal and set it in DTO
        // For now, assuming employeeId is passed and security will be handled by PreAuthorize
        LeaveRequestDTO createdRequest = leaveRequestService.createLeaveRequest(leaveRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdRequest);
    }

    // Get a specific leave request by ID (Admin/HR/Employee if it's their own)
    @PreAuthorize("hasAnyAuthority('ROLE_EMPLOYEE', 'ROLE_ADMIN', 'ROLE_HR')")
    @GetMapping("/{id}")
    public ResponseEntity<LeaveRequestDTO> getLeaveRequestById(@PathVariable Long id) {
        LeaveRequestDTO leaveRequest = leaveRequestService.getLeaveRequestById(id);
        return ResponseEntity.ok(leaveRequest);
    }

    // Get all leave requests (Admin/HR)
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HR')")
    @GetMapping
    public ResponseEntity<List<LeaveRequestDTO>> getAllLeaveRequests() {
        List<LeaveRequestDTO> leaveRequests = leaveRequestService.getAllLeaveRequests();
        return ResponseEntity.ok(leaveRequests);
    }

    // Get leave requests for a specific employee (Admin/HR/Employee for themselves)
    @PreAuthorize("hasAnyAuthority('ROLE_EMPLOYEE', 'ROLE_ADMIN', 'ROLE_HR')")
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<LeaveRequestDTO>> getLeaveRequestsByEmployeeId(@PathVariable Long employeeId) {
        List<LeaveRequestDTO> leaveRequests = leaveRequestService.getLeaveRequestsByEmployeeId(employeeId);
        return ResponseEntity.ok(leaveRequests);
    }

    // Admin/HR can approve a leave request
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HR')")
    @PutMapping("/{id}/approve")
    public ResponseEntity<LeaveRequestDTO> approveLeaveRequest(@PathVariable Long id, Principal principal) {
        // In a real app, get reviewer ID from principal
        Long reviewerId = 1L; // Placeholder for reviewer ID
        LeaveRequestDTO approvedRequest = leaveRequestService.approveLeaveRequest(id, reviewerId);
        return ResponseEntity.ok(approvedRequest);
    }

    // Admin/HR can reject a leave request
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HR')")
    @PutMapping("/{id}/reject")
    public ResponseEntity<LeaveRequestDTO> rejectLeaveRequest(@PathVariable Long id, Principal principal) {
        // In a real app, get reviewer ID from principal
        Long reviewerId = 1L; // Placeholder for reviewer ID
        LeaveRequestDTO rejectedRequest = leaveRequestService.rejectLeaveRequest(id, reviewerId);
        return ResponseEntity.ok(rejectedRequest);
    }

    // Employee can update their own pending leave request
    @PreAuthorize("hasAnyAuthority('ROLE_EMPLOYEE')")
    @PutMapping("/{id}")
    public ResponseEntity<LeaveRequestDTO> updateLeaveRequest(@PathVariable Long id, @RequestBody LeaveRequestDTO leaveRequestDTO, Principal principal) {
        // Ensure employee can only update their own requests and only if status is PENDING
        LeaveRequestDTO updatedRequest = leaveRequestService.updateLeaveRequest(id, leaveRequestDTO);
        return ResponseEntity.ok(updatedRequest);
    }

    // Employee can delete their own pending leave request
    @PreAuthorize("hasAnyAuthority('ROLE_EMPLOYEE')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLeaveRequest(@PathVariable Long id, Principal principal) {
        // Ensure employee can only delete their own requests and only if status is PENDING
        leaveRequestService.deleteLeaveRequest(id);
        return ResponseEntity.noContent().build();
    }
}
