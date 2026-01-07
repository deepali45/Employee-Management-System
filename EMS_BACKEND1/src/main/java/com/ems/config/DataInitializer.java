package com.ems.config;

import com.ems.entity.Employee;
import com.ems.entity.EmployeeRole;
import com.ems.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        List<Employee> admins = employeeRepository.findByCompanyEmail("admin.new@example.com");
        if (admins.isEmpty()) {
            Employee admin = new Employee();
            admin.setFullName("Admin User");
            admin.setDateOfBirth("2000-01-01");
            admin.setGender("N/A");
            admin.setAge(30);
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setCurrentAddress("Admin Address");
            admin.setPermanentAddress("Admin Address");
            admin.setMobileNumber("1234567890");
            admin.setPersonalEmail("admin.personal@example.com");
            admin.setCompanyEmail("admin.new@example.com");
            admin.setEmployeeRole(EmployeeRole.ADMIN);
            admin.setUsername("adminuser");
            admin.setAccountStatus("ACTIVE");
            
            employeeRepository.save(admin);
            System.out.println("Admin user created successfully.");
        } else {
            System.out.println("Admin user already exists.");
        }
    }
}
