package com.ems.service;

import com.ems.dto.AttendanceDTO;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceService {
    AttendanceDTO recordCheckIn(Long employeeId);
    AttendanceDTO recordCheckOut(Long employeeId);
    AttendanceDTO createAttendance(AttendanceDTO attendanceDTO);
    AttendanceDTO getAttendanceById(Long attendanceId);
    List<AttendanceDTO> getAllAttendance();
    List<AttendanceDTO> getAttendanceByEmployeeId(Long employeeId);
    List<AttendanceDTO> getAttendanceByDateRange(LocalDate startDate, LocalDate endDate);
    List<AttendanceDTO> getAttendanceByEmployeeAndDateRange(Long employeeId, LocalDate startDate, LocalDate endDate);
    AttendanceDTO updateAttendance(Long attendanceId, AttendanceDTO attendanceDTO);
    void deleteAttendance(Long attendanceId);
}
