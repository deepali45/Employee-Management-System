package com.ems.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class EmployeeDTO {

    private Long employeeId;
    private String fullName;
    private String dateOfBirth;
    private String gender;
    private String password;
    private String currentAddress;
    private String permanentAddress;
    private String mobileNumber;
    private String personalEmail;
    private String companyEmail;
    private String employeeRole;

    // Company / Official Details
    private String designation;
    private String department;
    private String dateOfJoining;
    private String reportingManager;
    private String officeLocation;
    private String employmentType;

    // System / Security Details
    private String username;
    private String accountStatus;
    private LocalDateTime lastLogin;
    private LocalDateTime createdAt;

    // Optional Details
    private String emergencyContact;
    private String bloodGroup;
    private String exitDate;
    private String reasonForExit;
    private String performanceRating;
    private String leaveBalance;

    // Nested DTOs
    private ProfessionalDetailsDTO professionalDetails;
    private List<ProjectDTO> projects;
    private FinanceDTO finance;


    // --- Getters and Setters for EmployeeDTO fields ---
    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCurrentAddress() {
        return currentAddress;
    }

    public void setCurrentAddress(String currentAddress) {
        this.currentAddress = currentAddress;
    }

    public String getPermanentAddress() {
        return permanentAddress;
    }

    public void setPermanentAddress(String permanentAddress) {
        this.permanentAddress = permanentAddress;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getPersonalEmail() {
        return personalEmail;
    }

    public void setPersonalEmail(String personalEmail) {
        this.personalEmail = personalEmail;
    }

    public String getCompanyEmail() {
        return companyEmail;
    }

    public void setCompanyEmail(String companyEmail) {
        this.companyEmail = companyEmail;
    }

    public String getEmployeeRole() {
        return employeeRole;
    }

    public void setEmployeeRole(String employeeRole) {
        this.employeeRole = employeeRole;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getDateOfJoining() {
        return dateOfJoining;
    }

    public void setDateOfJoining(String dateOfJoining) {
        this.dateOfJoining = dateOfJoining;
    }

    public String getReportingManager() {
        return reportingManager;
    }

    public void setReportingManager(String reportingManager) {
        this.reportingManager = reportingManager;
    }

    public String getOfficeLocation() {
        return officeLocation;
    }

    public void setOfficeLocation(String officeLocation) {
        this.officeLocation = officeLocation;
    }

    public String getEmploymentType() {
        return employmentType;
    }

    public void setEmploymentType(String employmentType) {
        this.employmentType = employmentType;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAccountStatus() {
        return accountStatus;
    }

    public void setAccountStatus(String accountStatus) {
        this.accountStatus = accountStatus;
    }

    public LocalDateTime getLastLogin() {
        return lastLogin;
    }

    public void setLastLogin(LocalDateTime lastLogin) {
        this.lastLogin = lastLogin;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getEmergencyContact() {
        return emergencyContact;
    }

    public void setEmergencyContact(String emergencyContact) {
        this.emergencyContact = emergencyContact;
    }

    public String getBloodGroup() {
        return bloodGroup;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }

    public String getExitDate() {
        return exitDate;
    }

    public void setExitDate(String exitDate) {
        this.exitDate = exitDate;
    }

    public String getReasonForExit() {
        return reasonForExit;
    }

    public void setReasonForExit(String reasonForExit) {
        this.reasonForExit = reasonForExit;
    }

    public String getPerformanceRating() {
        return performanceRating;
    }

    public void setPerformanceRating(String performanceRating) {
        this.performanceRating = performanceRating;
    }

    public String getLeaveBalance() {
        return leaveBalance;
    }

    public void setLeaveBalance(String leaveBalance) {
        this.leaveBalance = leaveBalance;
    }

    public ProfessionalDetailsDTO getProfessionalDetails() {
        return professionalDetails;
    }

    public void setProfessionalDetails(ProfessionalDetailsDTO professionalDetails) {
        this.professionalDetails = professionalDetails;
    }

    public List<ProjectDTO> getProjects() {
        return projects;
    }

    public void setProjects(List<ProjectDTO> projects) {
        this.projects = projects;
    }

    public FinanceDTO getFinance() {
        return finance;
    }

    public void setFinance(FinanceDTO finance) {
        this.finance = finance;
    }


    // --- Nested DTOs ---

    public static class ProfessionalDetailsDTO {
        private String skills;
        private String experience;
        private String certifications;
        private String previousCompany;

        // Getters and Setters
        public String getSkills() {
            return skills;
        }

        public void setSkills(String skills) {
            this.skills = skills;
        }

        public String getExperience() {
            return experience;
        }

        public void setExperience(String experience) {
            this.experience = experience;
        }

        public String getCertifications() {
            return certifications;
        }

        public void setCertifications(String certifications) {
            this.certifications = certifications;
        }

        public String getPreviousCompany() {
            return previousCompany;
        }

        public void setPreviousCompany(String previousCompany) {
            this.previousCompany = previousCompany;
        }
    }

    public static class ProjectDTO {
        private String currentProject;
        private String projectCode;
        private String clientName;

        // Getters and Setters
        public String getCurrentProject() {
            return currentProject;
        }

        public void setCurrentProject(String currentProject) {
            this.currentProject = currentProject;
        }

        public String getProjectCode() {
            return projectCode;
        }

        public void setProjectCode(String projectCode) {
            this.projectCode = projectCode;
        }

        public String getClientName() {
            return clientName;
        }

        public void setClientName(String clientName) {
            this.clientName = clientName;
        }
    }

    public static class FinanceDTO {
        private String panCard;
        private String aadharCard;
        private String bankName;
        private String accountNumber;
        private String ifscCode;
        private String ctc;
        private String ctcBreakup;


        private String branch;

        // Getters and Setters
        public String getPanCard() {
            return panCard;
        }

        public void setPanCard(String panCard) {
            this.panCard = panCard;
        }

        public String getAadharCard() {
            return aadharCard;
        }

        public void setAadharCard(String aadharCard) {
            this.aadharCard = aadharCard;
        }

        public String getBankName() {
            return bankName;
        }

        public void setBankName(String bankName) {
            this.bankName = bankName;
        }

        public String getAccountNumber() {
            return accountNumber;
        }

        public void setAccountNumber(String accountNumber) {
            this.accountNumber = accountNumber;
        }

        public String getIfscCode() {
            return ifscCode;
        }

        public void setIfscCode(String ifscCode) {
            this.ifscCode = ifscCode;
        }

        public String getCtc() {
            return ctc;
        }

        public void setCtc(String ctc) {
            this.ctc = ctc;
        }

        public String getCtcBreakup() {
            return ctcBreakup;
        }

        public void setCtcBreakup(String ctcBreakup) {
            this.ctcBreakup = ctcBreakup;
        }

        public String getBranch() {
            return branch;
        }

        public void setBranch(String branch) {
            this.branch = branch;
        }
    }
}
