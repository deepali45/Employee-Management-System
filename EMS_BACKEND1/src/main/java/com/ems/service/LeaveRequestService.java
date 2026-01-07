package com.ems.service;

import com.ems.dto.LeaveRequestDTO;

import java.util.List;

public interface LeaveRequestService {
    LeaveRequestDTO createLeaveRequest(LeaveRequestDTO leaveRequestDTO);
    LeaveRequestDTO getLeaveRequestById(Long leaveRequestId);
    List<LeaveRequestDTO> getAllLeaveRequests();
    List<LeaveRequestDTO> getLeaveRequestsByEmployeeId(Long employeeId);
    LeaveRequestDTO approveLeaveRequest(Long leaveRequestId, Long reviewerEmployeeId);
    LeaveRequestDTO rejectLeaveRequest(Long leaveRequestId, Long reviewerEmployeeId);
    LeaveRequestDTO updateLeaveRequest(Long leaveRequestId, LeaveRequestDTO leaveRequestDTO);
    void deleteLeaveRequest(Long leaveRequestId);
}
