package com.ems.service.impl;

import com.ems.dto.AttendanceDTO;
import com.ems.entity.Attendance;
import com.ems.entity.AttendanceStatus;
import com.ems.entity.Employee;
import com.ems.exception.ResourceNotFoundException;
import com.ems.repository.AttendanceRepository;
import com.ems.repository.EmployeeRepository;
import com.ems.service.AttendanceService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AttendanceServiceImpl implements AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public AttendanceDTO recordCheckIn(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID: " + employeeId));

        LocalDate today = LocalDate.now();
        Optional<Attendance> existingAttendance = attendanceRepository.findByEmployeeEmployeeIdAndAttendanceDate(employeeId, today);

        if (existingAttendance.isPresent()) {
            throw new IllegalArgumentException("Employee already checked in today.");
        }

        Attendance attendance = new Attendance();
        attendance.setEmployee(employee);
        attendance.setAttendanceDate(today);
        attendance.setCheckInTime(LocalTime.now());
        attendance.setStatus(AttendanceStatus.PRESENT);

        Attendance savedAttendance = attendanceRepository.save(attendance);
        return convertToDTO(savedAttendance);
    }

    @Override
    public AttendanceDTO recordCheckOut(Long employeeId) {
        LocalDate today = LocalDate.now();
        Attendance attendance = attendanceRepository.findByEmployeeEmployeeIdAndAttendanceDate(employeeId, today)
                .orElseThrow(() -> new ResourceNotFoundException("No check-in found for employee ID: " + employeeId + " today."));

        if (attendance.getCheckOutTime() != null) {
            throw new IllegalArgumentException("Employee already checked out today.");
        }

        attendance.setCheckOutTime(LocalTime.now());
        // You might want to update status based on check-in/out times, e.g., HALF_DAY if checked out too early
        Attendance updatedAttendance = attendanceRepository.save(attendance);
        return convertToDTO(updatedAttendance);
    }

    @Override
    public AttendanceDTO createAttendance(AttendanceDTO attendanceDTO) {
        Attendance attendance = new Attendance();
        BeanUtils.copyProperties(attendanceDTO, attendance, "employeeId");
        
        Employee employee = employeeRepository.findById(attendanceDTO.getEmployeeId())
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID: " + attendanceDTO.getEmployeeId()));
        attendance.setEmployee(employee);
        
        Attendance savedAttendance = attendanceRepository.save(attendance);
        return convertToDTO(savedAttendance);
    }

    @Override
    public AttendanceDTO getAttendanceById(Long attendanceId) {
        Attendance attendance = attendanceRepository.findById(attendanceId)
                .orElseThrow(() -> new ResourceNotFoundException("Attendance record not found with ID: " + attendanceId));
        return convertToDTO(attendance);
    }

    @Override
    public List<AttendanceDTO> getAllAttendance() {
        return attendanceRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<AttendanceDTO> getAttendanceByEmployeeId(Long employeeId) {
        return attendanceRepository.findByEmployeeEmployeeId(employeeId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<AttendanceDTO> getAttendanceByDateRange(LocalDate startDate, LocalDate endDate) {
        return attendanceRepository.findByAttendanceDateBetween(startDate, endDate).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<AttendanceDTO> getAttendanceByEmployeeAndDateRange(Long employeeId, LocalDate startDate, LocalDate endDate) {
        return attendanceRepository.findByEmployeeEmployeeIdAndAttendanceDateBetween(employeeId, startDate, endDate).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public AttendanceDTO updateAttendance(Long attendanceId, AttendanceDTO attendanceDTO) {
        Attendance existingAttendance = attendanceRepository.findById(attendanceId)
                .orElseThrow(() -> new ResourceNotFoundException("Attendance record not found with ID: " + attendanceId));

        BeanUtils.copyProperties(attendanceDTO, existingAttendance, "attendanceId", "employeeId");
        
        // Ensure employee cannot be changed
        if (attendanceDTO.getEmployeeId() != null && !existingAttendance.getEmployee().getEmployeeId().equals(attendanceDTO.getEmployeeId())) {
            throw new IllegalArgumentException("Employee ID cannot be changed in attendance record update.");
        }

        Attendance updatedAttendance = attendanceRepository.save(existingAttendance);
        return convertToDTO(updatedAttendance);
    }

    @Override
    public void deleteAttendance(Long attendanceId) {
        Attendance attendance = attendanceRepository.findById(attendanceId)
                .orElseThrow(() -> new ResourceNotFoundException("Attendance record not found with ID: " + attendanceId));
        attendanceRepository.delete(attendance);
    }

    private AttendanceDTO convertToDTO(Attendance attendance) {
        AttendanceDTO attendanceDTO = new AttendanceDTO();
        BeanUtils.copyProperties(attendance, attendanceDTO, "employee");
        if (attendance.getEmployee() != null) {
            attendanceDTO.setEmployeeId(attendance.getEmployee().getEmployeeId());
        }
        return attendanceDTO;
    }
}
