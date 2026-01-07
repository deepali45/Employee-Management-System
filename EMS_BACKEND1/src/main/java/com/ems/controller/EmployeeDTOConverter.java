package com.ems.controller;

import java.util.List;

import com.ems.entity.Employee;
import com.ems.entity.Finance;
import com.ems.entity.ProfessionalDetails;
import com.ems.entity.Project;

public class EmployeeDTOConverter{

    private Employee employee;
    private ProfessionalDetails professionalDetails;
    private Finance financeDetails;
    private List<Project> projectDetails;

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public ProfessionalDetails getProfessionalDetails() {
        return professionalDetails;
    }

    public void setProfessionalDetails(ProfessionalDetails professionalDetails) {
        this.professionalDetails = professionalDetails;
    }

    public Finance getFinanceDetails() {
        return financeDetails;
    }

    public void setFinanceDetails(Finance financeDetails) {
        this.financeDetails = financeDetails;
    }

    public List<Project> getProjectDetails() {
        return projectDetails;
    }

    public void setProjectDetails(List<Project> projectDetails) {
        this.projectDetails = projectDetails;
    }
}