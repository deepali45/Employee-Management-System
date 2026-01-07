package com.ems.service.impl;

import com.ems.dto.AuditLogDTO;
import com.ems.entity.AuditLog;
import com.ems.exception.ResourceNotFoundException;
import com.ems.repository.AuditLogRepository;
import com.ems.service.AuditLogService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuditLogServiceImpl implements AuditLogService {

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Override
    public AuditLogDTO createAuditLog(AuditLogDTO auditLogDTO) {
        AuditLog auditLog = new AuditLog();
        BeanUtils.copyProperties(auditLogDTO, auditLog);
        AuditLog savedAuditLog = auditLogRepository.save(auditLog);
        return convertToDTO(savedAuditLog);
    }

    @Override
    public AuditLogDTO getAuditLogById(Long logId) {
        AuditLog auditLog = auditLogRepository.findById(logId)
                .orElseThrow(() -> new ResourceNotFoundException("Audit Log not found with ID: " + logId));
        return convertToDTO(auditLog);
    }

    @Override
    public List<AuditLogDTO> getAllAuditLogs() {
        return auditLogRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<AuditLogDTO> getAuditLogsByUserId(Long userId) {
        return auditLogRepository.findByUserId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<AuditLogDTO> getAuditLogsByUsername(String username) {
        return auditLogRepository.findByUsername(username).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<AuditLogDTO> getAuditLogsByAction(String action) {
        return auditLogRepository.findByAction(action).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<AuditLogDTO> getAuditLogsByEntityTypeAndEntityId(String entityType, Long entityId) {
        return auditLogRepository.findByEntityTypeAndEntityId(entityType, entityId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<AuditLogDTO> getAuditLogsByTimestampBetween(LocalDateTime start, LocalDateTime end) {
        return auditLogRepository.findByTimestampBetween(start, end).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private AuditLogDTO convertToDTO(AuditLog auditLog) {
        AuditLogDTO auditLogDTO = new AuditLogDTO();
        BeanUtils.copyProperties(auditLog, auditLogDTO);
        return auditLogDTO;
    }
}
