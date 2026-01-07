// src/services/auditLogService.js
import axiosInstance from "../api/axiosConfig";

const AUDIT_LOG_API_URL = "/audit-logs";

const AuditLogService = {
  getAllAuditLogs: () => {
    return axiosInstance.get(AUDIT_LOG_API_URL);
  },

  getAuditLogById: (id) => {
    return axiosInstance.get(`${AUDIT_LOG_API_URL}/${id}`);
  },

  getAuditLogsByUserId: (userId) => {
    return axiosInstance.get(`${AUDIT_LOG_API_URL}/user/${userId}`);
  },

  getAuditLogsByUsername: (username) => {
    return axiosInstance.get(`${AUDIT_LOG_API_URL}/username/${username}`);
  },

  getAuditLogsByAction: (action) => {
    return axiosInstance.get(`${AUDIT_LOG_API_URL}/action/${action}`);
  },

  getAuditLogsByEntityTypeAndEntityId: (entityType, entityId) => {
    return axiosInstance.get(
      `${AUDIT_LOG_API_URL}/entity/${entityType}/${entityId}`
    );
  },

  getAuditLogsByTimestampBetween: (start, end) => {
    return axiosInstance.get(`${AUDIT_LOG_API_URL}/time-range`, {
      params: { start, end },
    });
  },
};

export default AuditLogService;
