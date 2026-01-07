package com.ems.controller;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.ems.dto.EmployeeDTO;
import com.ems.service.EmployeeService;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    // =========================
    // CREATE EMPLOYEE
    // =========================
    @PostMapping
    public ResponseEntity<EmployeeDTO> createEmployee(
            @RequestBody EmployeeDTO employeeDTO) {
        EmployeeDTO createdEmployee = employeeService.createEmployee(employeeDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdEmployee);
    }

    // =========================
    // GET LOGGED-IN EMPLOYEE PROFILE
    // =========================
    @GetMapping("/profile/{employeeId}")
    public ResponseEntity<EmployeeDTO> getEmployeeProfile(@PathVariable Long employeeId) {
        EmployeeDTO employeeDTO = employeeService.getEmployeeById(employeeId);
        return ResponseEntity.ok(employeeDTO);
    }

    // =========================
    // UPDATE LOGGED-IN EMPLOYEE PROFILE
    // =========================
    @PutMapping("/profile/{employeeId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or #employeeId == principal.employeeId")
    public ResponseEntity<EmployeeDTO> updateEmployeeProfile(
            @PathVariable Long employeeId,
            @RequestBody EmployeeDTO employeeDTO) {

        EmployeeDTO updatedEmployee =
                employeeService.updateEmployee(employeeId, employeeDTO);

        return ResponseEntity.ok(updatedEmployee);
    }

    // =========================
    // GET ALL EMPLOYEES (ADMIN)
    // =========================
    @GetMapping
    public ResponseEntity<List<EmployeeDTO>> getAllEmployees() {
        return ResponseEntity.ok(employeeService.getAllEmployees());
    }

    // =========================
    // GET EMPLOYEE BY ID
    // =========================
    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDTO> getEmployeeById(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.getEmployeeById(id));
    }

    // =========================
    // UPDATE EMPLOYEE BY ID
    // =========================
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<EmployeeDTO> updateEmployee(
            @PathVariable Long id,
            @RequestBody EmployeeDTO employeeDTO) {

        EmployeeDTO updatedEmployee = employeeService.updateEmployee(id, employeeDTO);
        return ResponseEntity.ok(updatedEmployee);
    }

    // =========================
    // DELETE EMPLOYEE
    // =========================
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Map<String, String>> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.ok(
                Map.of("message", "Employee with Id " + id + " deleted successfully"));
    }
}
