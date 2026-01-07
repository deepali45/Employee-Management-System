package com.ems.controller;

import com.ems.dto.AttendanceSummaryDTO;
import com.ems.dto.DashboardOverviewDTO;
import com.ems.dto.LeaveSummaryDTO;
import com.ems.dto.RoleDistributionDTO;
import com.ems.service.DashboardService;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    // Dashboard overview
    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    @GetMapping("/overview")
    public ResponseEntity<DashboardOverviewDTO> getDashboardOverview() {
        return ResponseEntity.ok(dashboardService.getDashboardOverview());
    }

    // Leave summary
    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    @GetMapping("/leave-summary")
    public ResponseEntity<LeaveSummaryDTO> getLeaveSummary() {
        return ResponseEntity.ok(dashboardService.getLeaveSummary());
    }

    // Attendance summary
    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    @GetMapping("/attendance-summary")
    public ResponseEntity<AttendanceSummaryDTO> getAttendanceSummary(
            @RequestParam @JsonFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam @JsonFormat(pattern = "yyyy-MM-dd") LocalDate endDate) {
        return ResponseEntity.ok(
                dashboardService.getAttendanceSummary(startDate, endDate)
        );
    }

    // Role distribution
    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    @GetMapping("/role-distribution")
    public ResponseEntity<RoleDistributionDTO> getEmployeeRoleDistribution() {
        return ResponseEntity.ok(dashboardService.getEmployeeRoleDistribution());
    }
}
