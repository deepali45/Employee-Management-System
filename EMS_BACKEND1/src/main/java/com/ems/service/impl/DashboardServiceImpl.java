package com.ems.service.impl;

import com.ems.dto.AttendanceSummaryDTO;
import com.ems.dto.DashboardOverviewDTO;
import com.ems.dto.LeaveSummaryDTO;
import com.ems.dto.RoleDistributionDTO;
import com.ems.entity.AttendanceStatus;
import com.ems.entity.LeaveStatus;
import com.ems.entity.TaskStatus;
import com.ems.repository.AttendanceRepository;
import com.ems.repository.EmployeeRepository;
import com.ems.repository.LeaveRequestRepository;
import com.ems.repository.TaskRepository;
import com.ems.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.counting;
import static java.util.stream.Collectors.groupingBy;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public DashboardOverviewDTO getDashboardOverview() {
        DashboardOverviewDTO overview = new DashboardOverviewDTO();

        overview.setTotalEmployees(employeeRepository.count());

        // Employees on leave
        long employeesOnLeave = leaveRequestRepository.findAll().stream()
                .filter(lr -> lr.getStatus() == LeaveStatus.APPROVED &&
                        lr.getStartDate().isBefore(LocalDate.now().plusDays(1)) &&
                        lr.getEndDate().isAfter(LocalDate.now().minusDays(1)))
                .map(lr -> lr.getEmployee().getEmployeeId())
                .distinct()
                .count();
        overview.setEmployeesOnLeave(employeesOnLeave);

        // Pending leave requests
        overview.setPendingLeaveRequests(leaveRequestRepository.findAll().stream()
                .filter(lr -> lr.getStatus() == LeaveStatus.PENDING)
                .count());

        // Employees present today
        long employeesPresentToday = attendanceRepository.findByAttendanceDate(LocalDate.now()).stream()
                .filter(a -> a.getStatus() == AttendanceStatus.PRESENT)
                .count();
        overview.setEmployeesPresentToday(employeesPresentToday);

        // Tasks
        overview.setTotalTasks(taskRepository.count());
        overview.setPendingTasks(taskRepository.findByStatus(TaskStatus.PENDING).size());
        overview.setCompletedTasks(taskRepository.findByStatus(TaskStatus.COMPLETED).size());

        return overview;
    }

    @Override
    public LeaveSummaryDTO getLeaveSummary() {
        LeaveSummaryDTO summary = new LeaveSummaryDTO();
        List<com.ems.entity.LeaveRequest> allLeaveRequests = leaveRequestRepository.findAll();

        summary.setTotalLeaveRequests(allLeaveRequests.size());
        summary.setApprovedLeaves(allLeaveRequests.stream().filter(lr -> lr.getStatus() == LeaveStatus.APPROVED).count());
        summary.setPendingLeaves(allLeaveRequests.stream().filter(lr -> lr.getStatus() == LeaveStatus.PENDING).count());
        summary.setRejectedLeaves(allLeaveRequests.stream().filter(lr -> lr.getStatus() == LeaveStatus.REJECTED).count());
        summary.setCancelledLeaves(allLeaveRequests.stream().filter(lr -> lr.getStatus() == LeaveStatus.CANCELLED).count());

        return summary;
    }

    @Override
    public AttendanceSummaryDTO getAttendanceSummary(LocalDate startDate, LocalDate endDate) {
        AttendanceSummaryDTO summary = new AttendanceSummaryDTO();
        List<com.ems.entity.Attendance> attendanceRecords = attendanceRepository.findByAttendanceDateBetween(startDate, endDate);

        summary.setTotalPresent(attendanceRecords.stream().filter(a -> a.getStatus() == AttendanceStatus.PRESENT).count());
        summary.setTotalAbsent(attendanceRecords.stream().filter(a -> a.getStatus() == AttendanceStatus.ABSENT).count());
        summary.setTotalHalfDay(attendanceRecords.stream().filter(a -> a.getStatus() == AttendanceStatus.HALF_DAY).count());
        summary.setTotalLeave(attendanceRecords.stream().filter(a -> a.getStatus() == AttendanceStatus.LEAVE).count());
        summary.setTotalHoliday(attendanceRecords.stream().filter(a -> a.getStatus() == AttendanceStatus.HOLIDAY).count());

        return summary;
    }

    @Override
    public RoleDistributionDTO getEmployeeRoleDistribution() {
        RoleDistributionDTO distribution = new RoleDistributionDTO();
        Map<String, Long> roleCounts = employeeRepository.findAll().stream()
                .collect(groupingBy(employee -> {
                String roleName = employee.getEmployeeRole().name();
                // Remove "ROLE_" prefix if present
                if (roleName.startsWith("ROLE_")) {
                    return roleName.substring(5); // "ROLE_".length() == 5
                }
                return roleName;
            }, counting()));
        distribution.setRoleCounts(roleCounts);
        return distribution;
    }
}
