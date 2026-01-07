package com.ems.service;

                     

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ems.entity.Employee;
import com.ems.repository.EmployeeRepository;

@Service
public class PasswordMigrationService {

    @Autowired
    private EmployeeRepository employeeRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void hashAllPasswordsOnce() {
        List<Employee> employees = employeeRepo.findAll();

        for (Employee emp : employees) {
            if (emp.getPassword() != null && !emp.getPassword().startsWith("$2a$")) {
                emp.setPassword(passwordEncoder.encode(emp.getPassword()));
            }
        }

        employeeRepo.saveAll(employees);
        System.out.println("✅ All plain-text passwords have been hashed.");
    }
}
