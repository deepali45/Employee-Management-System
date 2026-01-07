package com.ems.controller;

import com.ems.dto.AuditLogDTO;
import com.ems.service.AuditLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/audit-logs")
public class AuditLogController {

    @Autowired
    private AuditLogService auditLogService;

    // Only Admin/HR can view audit logs
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HR')")
    @GetMapping
    public ResponseEntity<List<AuditLogDTO>> getAllAuditLogs() {
        List<AuditLogDTO> auditLogs = auditLogService.getAllAuditLogs();
        return ResponseEntity.ok(auditLogs);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HR')")
    @GetMapping("/{id}")
    public ResponseEntity<AuditLogDTO> getAuditLogById(@PathVariable Long id) {
        AuditLogDTO auditLog = auditLogService.getAuditLogById(id);
        return ResponseEntity.ok(auditLog);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HR')")
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AuditLogDTO>> getAuditLogsByUserId(@PathVariable Long userId) {
        List<AuditLogDTO> auditLogs = auditLogService.getAuditLogsByUserId(userId);
        return ResponseEntity.ok(auditLogs);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HR')")
    @GetMapping("/username/{username}")
    public ResponseEntity<List<AuditLogDTO>> getAuditLogsByUsername(@PathVariable String username) {
        List<AuditLogDTO> auditLogs = auditLogService.getAuditLogsByUsername(username);
        return ResponseEntity.ok(auditLogs);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HR')")
    @GetMapping("/action/{action}")
    public ResponseEntity<List<AuditLogDTO>> getAuditLogsByAction(@PathVariable String action) {
        List<AuditLogDTO> auditLogs = auditLogService.getAuditLogsByAction(action);
        return ResponseEntity.ok(auditLogs);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HR')")
    @GetMapping("/entity/{entityType}/{entityId}")
    public ResponseEntity<List<AuditLogDTO>> getAuditLogsByEntityTypeAndEntityId(
            @PathVariable String entityType,
            @PathVariable Long entityId) {
        List<AuditLogDTO> auditLogs = auditLogService.getAuditLogsByEntityTypeAndEntityId(entityType, entityId);
        return ResponseEntity.ok(auditLogs);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HR')")
    @GetMapping("/time-range")
    public ResponseEntity<List<AuditLogDTO>> getAuditLogsByTimestampBetween(
            @RequestParam LocalDateTime start,
            @RequestParam LocalDateTime end) {
        List<AuditLogDTO> auditLogs = auditLogService.getAuditLogsByTimestampBetween(start, end);
        return ResponseEntity.ok(auditLogs);
    }
}
