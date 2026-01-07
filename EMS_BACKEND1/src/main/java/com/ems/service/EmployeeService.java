package com.ems.service;

import java.util.List;

import com.ems.dto.EmployeeDTO; // Import the new EmployeeDTO

public interface EmployeeService {

	EmployeeDTO createEmployee(EmployeeDTO employeeDTO); // Changed to use EmployeeDTO
	
	EmployeeDTO getEmployeeById(Long employeeId); // Changed return type to EmployeeDTO
	
	List<EmployeeDTO> getAllEmployees(); // Changed return type to List<EmployeeDTO>
	
	EmployeeDTO updateEmployee(Long employeeId, EmployeeDTO employeeDTO); // Changed to use EmployeeDTO
	
	void deleteEmployee(Long employeeId);
	
	EmployeeDTO getEmployeeByCompanyEmail(String companyEmail);
	
	//Employee getpersonalDetails(Long employeeId);

}
