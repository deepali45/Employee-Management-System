package com.ems.service;

import com.ems.dto.AuditLogDTO;

import java.time.LocalDateTime;
import java.util.List;

public interface AuditLogService {
    AuditLogDTO createAuditLog(AuditLogDTO auditLogDTO);
    AuditLogDTO getAuditLogById(Long logId);
    List<AuditLogDTO> getAllAuditLogs();
    List<AuditLogDTO> getAuditLogsByUserId(Long userId);
    List<AuditLogDTO> getAuditLogsByUsername(String username);
    List<AuditLogDTO> getAuditLogsByAction(String action);
    List<AuditLogDTO> getAuditLogsByEntityTypeAndEntityId(String entityType, Long entityId);
    List<AuditLogDTO> getAuditLogsByTimestampBetween(LocalDateTime start, LocalDateTime end);
}
