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
@Table(name = "finance")
public class Finance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long financeId;

    @OneToOne
    @JoinColumn(
        name = "employee_id",
        referencedColumnName = "employee_id",
        nullable = false
    )
    @JsonIgnore
    private Employee employee;

    @Column(nullable = false)
    private String panCard;

    @Column(nullable = false)
    private String aadharCard;

    @Column(nullable = false)
    private String bankName;

    @Column(nullable = false)
    private String accountNumber; // Added account number

    @Column(nullable = false)
    private String ifscCode;

    @Column(nullable = false)
    private String ctc; // Added CTC field (was missing before, though ctcBreakup existed)

    @Column(name = "salary_breakup", nullable = false)
    private String ctcBreakup = "";



    @Column(nullable = false)
    private String branch = "";

    // ---------- Getters & Setters ----------

    public Long getFinanceId() {
        return financeId;
    }

    public void setFinanceId(Long financeId) {
        this.financeId = financeId;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

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
