package com.ems.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ems.config.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.ems.entity.Employee;
import com.ems.entity. EmployeeRole;
import com.ems.repository.EmployeeRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class LoginController {

    @Autowired
    private EmployeeRepository employeeRepo;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {

        String companyEmail = loginData.get("companyEmail");
        String password = loginData.get("password");
        
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(companyEmail, password)
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            List<Employee> employees = employeeRepo.findByCompanyEmail(companyEmail);
            if (employees.isEmpty()) {
                return ResponseEntity.status(404)
                        .body(Map.of("message", "User not found"));
            }
            Employee emp = employees.get(0);

            String token = jwtUtil.generateToken(emp);

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("employeeId", emp.getEmployeeId());
            response.put("role", emp.getEmployeeRole().name());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(401)
                    .body(Map.of("message", "Invalid credentials"));
        }
    }
}
