package com.ems.controller;

import com.ems.dto.AttendanceDTO;
import com.ems.service.AttendanceService;
import com.fasterxml.jackson.annotation.JsonFormat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    // Employee check-in
    @PreAuthorize("hasAnyAuthority('ROLE_EMPLOYEE')")
    @PostMapping("/check-in/{employeeId}")
    public ResponseEntity<AttendanceDTO> checkIn(@PathVariable Long employeeId, Principal principal) {
        // In a real app, verify employeeId matches principal's employeeId
        AttendanceDTO attendance = attendanceService.recordCheckIn(employeeId);
        return ResponseEntity.status(HttpStatus.CREATED).body(attendance);
    }

    // Employee check-out
    @PreAuthorize("hasAnyAuthority('ROLE_EMPLOYEE')")
    @PostMapping("/check-out/{employeeId}")
    public ResponseEntity<AttendanceDTO> checkOut(@PathVariable Long employeeId, Principal principal) {
        // In a real app, verify employeeId matches principal's employeeId
        AttendanceDTO attendance = attendanceService.recordCheckOut(employeeId);
        return ResponseEntity.ok(attendance);
    }
    
    // Admin/HR can create attendance record (e.g., for absent employees or corrections)
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HR')")
    @PostMapping
    public ResponseEntity<AttendanceDTO> createAttendance(@RequestBody AttendanceDTO attendanceDTO) {
        AttendanceDTO createdAttendance = attendanceService.createAttendance(attendanceDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAttendance);
    }

    // Get attendance by ID (Admin/HR/Employee for their own)
    @PreAuthorize("hasAnyAuthority('ROLE_EMPLOYEE', 'ROLE_ADMIN', 'ROLE_HR')")
    @GetMapping("/{id}")
    public ResponseEntity<AttendanceDTO> getAttendanceById(@PathVariable Long id) {
        AttendanceDTO attendance = attendanceService.getAttendanceById(id);
        return ResponseEntity.ok(attendance);
    }

    // Get all attendance records (Admin/HR)
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HR')")
    @GetMapping
    public ResponseEntity<List<AttendanceDTO>> getAllAttendance() {
        List<AttendanceDTO> attendanceList = attendanceService.getAllAttendance();
        return ResponseEntity.ok(attendanceList);
    }

    // Get attendance for a specific employee (Admin/HR/Employee for themselves)
    @PreAuthorize("hasAnyAuthority('ROLE_EMPLOYEE', 'ROLE_ADMIN', 'ROLE_HR')")
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<AttendanceDTO>> getAttendanceByEmployeeId(@PathVariable Long employeeId) {
        List<AttendanceDTO> attendanceList = attendanceService.getAttendanceByEmployeeId(employeeId);
        return ResponseEntity.ok(attendanceList);
    }
    
    // Get attendance by date range (Admin/HR)
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HR')")
    @GetMapping("/date-range")
    public ResponseEntity<List<AttendanceDTO>> getAttendanceByDateRange(
            @RequestParam @JsonFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam @JsonFormat(pattern = "yyyy-MM-dd") LocalDate endDate) {
        List<AttendanceDTO> attendanceList = attendanceService.getAttendanceByDateRange(startDate, endDate);
        return ResponseEntity.ok(attendanceList);
    }

    // Get attendance for an employee by date range (Admin/HR/Employee for themselves)
    @PreAuthorize("hasAnyAuthority('ROLE_EMPLOYEE', 'ROLE_ADMIN', 'ROLE_HR')")
    @GetMapping("/employee/{employeeId}/date-range")
    public ResponseEntity<List<AttendanceDTO>> getAttendanceByEmployeeAndDateRange(
            @PathVariable Long employeeId,
            @RequestParam @JsonFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam @JsonFormat(pattern = "yyyy-MM-dd") LocalDate endDate) {
        List<AttendanceDTO> attendanceList = attendanceService.getAttendanceByEmployeeAndDateRange(employeeId, startDate, endDate);
        return ResponseEntity.ok(attendanceList);
    }

    // Admin/HR can update attendance records
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HR')")
    @PutMapping("/{id}")
    public ResponseEntity<AttendanceDTO> updateAttendance(@PathVariable Long id, @RequestBody AttendanceDTO attendanceDTO) {
        AttendanceDTO updatedAttendance = attendanceService.updateAttendance(id, attendanceDTO);
        return ResponseEntity.ok(updatedAttendance);
    }

    // Admin/HR can delete attendance records
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HR')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAttendance(@PathVariable Long id) {
        attendanceService.deleteAttendance(id);
        return ResponseEntity.noContent().build();
    }
}
