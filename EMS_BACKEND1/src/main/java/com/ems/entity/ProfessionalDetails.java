package com.ems.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "professional_details")
public class ProfessionalDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long profDetailId;

    @OneToOne
    @JoinColumn(
        name = "employee_id",
        referencedColumnName = "employee_id",
        nullable = false
    )
    @JsonIgnore
    private Employee employee;

    // New fields for Professional Details
    @Column
    private String skills;
    @Column
    private String experience;
    @Column
    private String certifications;
    @Column
    private String previousCompany;

    // ---------- Getters & Setters ----------

    public Long getProfDetailId() {
        return profDetailId;
    }

    public void setProfDetailId(Long profDetailId) {
        this.profDetailId = profDetailId;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

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
