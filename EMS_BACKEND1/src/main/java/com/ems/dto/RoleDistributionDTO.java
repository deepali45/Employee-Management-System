package com.ems.dto;

import java.util.Map;

public class RoleDistributionDTO {
    private Map<String, Long> roleCounts;

    public Map<String, Long> getRoleCounts() {
        return roleCounts;
    }

    public void setRoleCounts(Map<String, Long> roleCounts) {
        this.roleCounts = roleCounts;
    }
}
