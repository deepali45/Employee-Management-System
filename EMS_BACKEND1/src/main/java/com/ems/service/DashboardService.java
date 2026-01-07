package com.ems.service;

import com.ems.dto.AttendanceSummaryDTO;
import com.ems.dto.DashboardOverviewDTO;
import com.ems.dto.LeaveSummaryDTO;
import com.ems.dto.RoleDistributionDTO;

import java.time.LocalDate;

public interface DashboardService {
    DashboardOverviewDTO getDashboardOverview();
    LeaveSummaryDTO getLeaveSummary();
    AttendanceSummaryDTO getAttendanceSummary(LocalDate startDate, LocalDate endDate);
    RoleDistributionDTO getEmployeeRoleDistribution();
}
