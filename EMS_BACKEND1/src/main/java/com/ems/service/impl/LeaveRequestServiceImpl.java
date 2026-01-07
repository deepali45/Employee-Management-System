package com.ems.service.impl;

import com.ems.dto.LeaveRequestDTO;
import com.ems.entity.Employee;
import com.ems.entity.LeaveRequest;
import com.ems.entity.LeaveStatus;
import com.ems.exception.ResourceNotFoundException;
import com.ems.repository.EmployeeRepository;
import com.ems.repository.LeaveRequestRepository;
import com.ems.service.LeaveRequestService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LeaveRequestServiceImpl implements LeaveRequestService {

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public LeaveRequestDTO createLeaveRequest(LeaveRequestDTO leaveRequestDTO) {
        LeaveRequest leaveRequest = new LeaveRequest();
        BeanUtils.copyProperties(leaveRequestDTO, leaveRequest, "employeeId", "reviewedByEmployeeId");

        Employee employee = employeeRepository.findById(leaveRequestDTO.getEmployeeId())
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID: " + leaveRequestDTO.getEmployeeId()));
        leaveRequest.setEmployee(employee);
        leaveRequest.setStatus(LeaveStatus.PENDING);
        leaveRequest.setRequestedAt(LocalDateTime.now());

        LeaveRequest savedLeaveRequest = leaveRequestRepository.save(leaveRequest);
        return convertToDTO(savedLeaveRequest);
    }

    @Override
    public LeaveRequestDTO getLeaveRequestById(Long leaveRequestId) {
        LeaveRequest leaveRequest = leaveRequestRepository.findById(leaveRequestId)
                .orElseThrow(() -> new ResourceNotFoundException("Leave Request not found with ID: " + leaveRequestId));
        return convertToDTO(leaveRequest);
    }

    @Override
    public List<LeaveRequestDTO> getAllLeaveRequests() {
        return leaveRequestRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<LeaveRequestDTO> getLeaveRequestsByEmployeeId(Long employeeId) {
        return leaveRequestRepository.findByEmployeeEmployeeId(employeeId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public LeaveRequestDTO approveLeaveRequest(Long leaveRequestId, Long reviewerEmployeeId) {
        LeaveRequest leaveRequest = leaveRequestRepository.findById(leaveRequestId)
                .orElseThrow(() -> new ResourceNotFoundException("Leave Request not found with ID: " + leaveRequestId));
        
        Employee reviewer = employeeRepository.findById(reviewerEmployeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Reviewer Employee not found with ID: " + reviewerEmployeeId));

        leaveRequest.setStatus(LeaveStatus.APPROVED);
        leaveRequest.setReviewedBy(reviewer);
        leaveRequest.setReviewedAt(LocalDateTime.now());
        LeaveRequest updatedLeaveRequest = leaveRequestRepository.save(leaveRequest);
        return convertToDTO(updatedLeaveRequest);
    }

    @Override
    public LeaveRequestDTO rejectLeaveRequest(Long leaveRequestId, Long reviewerEmployeeId) {
        LeaveRequest leaveRequest = leaveRequestRepository.findById(leaveRequestId)
                .orElseThrow(() -> new ResourceNotFoundException("Leave Request not found with ID: " + leaveRequestId));

        Employee reviewer = employeeRepository.findById(reviewerEmployeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Reviewer Employee not found with ID: " + reviewerEmployeeId));

        leaveRequest.setStatus(LeaveStatus.REJECTED);
        leaveRequest.setReviewedBy(reviewer);
        leaveRequest.setReviewedAt(LocalDateTime.now());
        LeaveRequest updatedLeaveRequest = leaveRequestRepository.save(leaveRequest);
        return convertToDTO(updatedLeaveRequest);
    }

    @Override
    public LeaveRequestDTO updateLeaveRequest(Long leaveRequestId, LeaveRequestDTO leaveRequestDTO) {
        LeaveRequest existingLeaveRequest = leaveRequestRepository.findById(leaveRequestId)
                .orElseThrow(() -> new ResourceNotFoundException("Leave Request not found with ID: " + leaveRequestId));

        BeanUtils.copyProperties(leaveRequestDTO, existingLeaveRequest, "leaveRequestId", "employeeId", "requestedAt", "status", "reviewedByEmployeeId", "reviewedAt");

        // Ensure employee is not changed by update
        if (leaveRequestDTO.getEmployeeId() != null && !existingLeaveRequest.getEmployee().getEmployeeId().equals(leaveRequestDTO.getEmployeeId())) {
             throw new IllegalArgumentException("Employee ID cannot be changed in leave request update.");
        }

        // Only allow updating if the status is PENDING
        if (existingLeaveRequest.getStatus() != LeaveStatus.PENDING) {
            throw new IllegalArgumentException("Only pending leave requests can be updated.");
        }

        LeaveRequest updatedLeaveRequest = leaveRequestRepository.save(existingLeaveRequest);
        return convertToDTO(updatedLeaveRequest);
    }

    @Override
    public void deleteLeaveRequest(Long leaveRequestId) {
        LeaveRequest leaveRequest = leaveRequestRepository.findById(leaveRequestId)
                .orElseThrow(() -> new ResourceNotFoundException("Leave Request not found with ID: " + leaveRequestId));
        leaveRequestRepository.delete(leaveRequest);
    }

    private LeaveRequestDTO convertToDTO(LeaveRequest leaveRequest) {
        LeaveRequestDTO leaveRequestDTO = new LeaveRequestDTO();
        BeanUtils.copyProperties(leaveRequest, leaveRequestDTO, "employee", "reviewedBy");
        if (leaveRequest.getEmployee() != null) {
            leaveRequestDTO.setEmployeeId(leaveRequest.getEmployee().getEmployeeId());
        }
        if (leaveRequest.getReviewedBy() != null) {
            leaveRequestDTO.setReviewedByEmployeeId(leaveRequest.getReviewedBy().getEmployeeId());
        }
        return leaveRequestDTO;
    }
}
