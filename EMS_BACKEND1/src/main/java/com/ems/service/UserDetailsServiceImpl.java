package com.ems.service;

import com.ems.config.CustomUserDetails;
import com.ems.entity.Employee;
import com.ems.repository.EmployeeRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final EmployeeRepository employeeRepository;

    public UserDetailsServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String companyEmail)
            throws UsernameNotFoundException {

        // 🔹 Get employee by email
        Employee employee = employeeRepository
                .findByCompanyEmail(companyEmail)
                .stream()
                .findFirst()
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                "User not found with email: " + companyEmail
                        )
                );

        // 🔹 Convert role to Spring Security format
        SimpleGrantedAuthority authority =
                new SimpleGrantedAuthority(
                        "ROLE_" + employee.getEmployeeRole().name()
                );

        return new CustomUserDetails(
                employee.getCompanyEmail(),
                employee.getPassword(),
                List.of(authority),
                employee.getEmployeeId()
        );
    }
}
