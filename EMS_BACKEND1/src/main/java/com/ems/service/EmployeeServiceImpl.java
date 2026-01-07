package com.ems.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ems.dto.EmployeeDTO;
import com.ems.entity.Employee;
import com.ems.entity.Finance;
import com.ems.entity.ProfessionalDetails;
import com.ems.entity.Project;
import com.ems.entity.EmployeeRole;
import com.ems.exception.ResourceNotFoundException;
import com.ems.repository.EmployeeRepository;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ---------------- CREATE ----------------
    @Override
    public EmployeeDTO createEmployee(EmployeeDTO employeeDTO) {

        Employee employee = new Employee();
        BeanUtils.copyProperties(employeeDTO, employee,
                "employeeId", "password", "professionalDetails", "finance", "projects");

        employee.setCompanyEmail(employeeDTO.getCompanyEmail());
        employee.setMobileRaw(employeeDTO.getMobileNumber());
        employee.setCompanyEmailLegacy(employeeDTO.getCompanyEmail());
        employee.setPassword(passwordEncoder.encode(employeeDTO.getPassword()));

        employee.setEmployeeRole(
                employeeDTO.getEmployeeRole() != null
                        ? EmployeeRole.valueOf(employeeDTO.getEmployeeRole().toUpperCase())
                        : EmployeeRole.EMPLOYEE
        );

        employee.setRole(employee.getEmployeeRole().name());


        employee.setLastLogin(LocalDateTime.now());

        // Save employee first to get an ID
        Employee savedEmployee = employeeRepository.save(employee);

        // ProfessionalDetails
        if (employeeDTO.getProfessionalDetails() != null) {
            ProfessionalDetails pd = new ProfessionalDetails();
            BeanUtils.copyProperties(employeeDTO.getProfessionalDetails(), pd);
            pd.setEmployee(savedEmployee);
            savedEmployee.setProfessionalDetails(pd);
        }

        // Finance
        if (employeeDTO.getFinance() != null) {
            Finance finance = new Finance();
            BeanUtils.copyProperties(employeeDTO.getFinance(), finance);
            finance.setEmployee(savedEmployee);
            savedEmployee.setFinance(finance);
        }

        // Projects
        if (employeeDTO.getProjects() != null) {
            List<Project> projects = employeeDTO.getProjects().stream().map(dto -> {
                Project p = new Project();
                BeanUtils.copyProperties(dto, p);
                p.setEmployee(savedEmployee);
                return p;
            }).collect(Collectors.toList());
            savedEmployee.setProjects(projects);
        }

        return convertToDTO(savedEmployee);
    }

    // ---------------- GET BY ID ----------------
    @Override
    public EmployeeDTO getEmployeeById(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));
        return convertToDTO(employee);
    }

    // ---------------- GET ALL ----------------
    @Override
    public List<EmployeeDTO> getAllEmployees() {
        return employeeRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // ---------------- UPDATE ----------------
    @Override
    public EmployeeDTO updateEmployee(Long employeeId, EmployeeDTO employeeDTO) {

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

        BeanUtils.copyProperties(employeeDTO, employee,
                "employeeId", "password", "createdAt", "lastLogin",
                "professionalDetails", "finance", "projects");

        if (employeeDTO.getPassword() != null && !employeeDTO.getPassword().isBlank()) {
            employee.setPassword(passwordEncoder.encode(employeeDTO.getPassword()));
        }

        employee.setLastLogin(LocalDateTime.now());

        // ProfessionalDetails
        if (employeeDTO.getProfessionalDetails() != null) {
            ProfessionalDetails pd = employee.getProfessionalDetails();
            if (pd == null) {
                pd = new ProfessionalDetails();
                pd.setEmployee(employee);
            }
            BeanUtils.copyProperties(employeeDTO.getProfessionalDetails(), pd);
            employee.setProfessionalDetails(pd);
        } else {
            employee.setProfessionalDetails(null);
        }

        // Finance
        if (employeeDTO.getFinance() != null) {
            Finance finance = employee.getFinance();
            if (finance == null) {
                finance = new Finance();
                finance.setEmployee(employee);
            }
            BeanUtils.copyProperties(employeeDTO.getFinance(), finance);
            finance.setBranch(employeeDTO.getFinance().getBranch() != null ? employeeDTO.getFinance().getBranch() : "");
            employee.setFinance(finance);
        } else {
            employee.setFinance(null);
        }

        // Projects
        employee.getProjects().clear();
        if (employeeDTO.getProjects() != null) {
            employeeDTO.getProjects().forEach(dto -> {
                Project p = new Project();
                BeanUtils.copyProperties(dto, p);
                p.setEmployee(employee);
                employee.getProjects().add(p);
            });
        }

        return convertToDTO(employeeRepository.save(employee));
    }

    // ---------------- DELETE ----------------
    @Override
    public void deleteEmployee(Long employeeId) {
        if (!employeeRepository.existsById(employeeId)) {
            throw new ResourceNotFoundException("Employee not found");
        }
        employeeRepository.deleteById(employeeId);
    }

    // ---------------- GET BY COMPANY EMAIL ----------------
    @Override
    public EmployeeDTO getEmployeeByCompanyEmail(String companyEmail) {
        Employee employee = employeeRepository.findByCompanyEmail(companyEmail)
                .stream()
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));
        return convertToDTO(employee);
    }

    // ---------------- ENTITY → DTO ----------------
    private EmployeeDTO convertToDTO(Employee employee) {

        EmployeeDTO dto = new EmployeeDTO();
        BeanUtils.copyProperties(employee, dto, "password", "professionalDetails", "finance", "projects");

        if (employee.getProfessionalDetails() != null) {
            EmployeeDTO.ProfessionalDetailsDTO pdDTO = new EmployeeDTO.ProfessionalDetailsDTO();
            BeanUtils.copyProperties(employee.getProfessionalDetails(), pdDTO);
            dto.setProfessionalDetails(pdDTO);
        }

        if (employee.getFinance() != null) {
            EmployeeDTO.FinanceDTO fDTO = new EmployeeDTO.FinanceDTO();
            BeanUtils.copyProperties(employee.getFinance(), fDTO);
            dto.setFinance(fDTO);
        }

        if (employee.getProjects() != null) {
            dto.setProjects(employee.getProjects().stream().map(p -> {
                EmployeeDTO.ProjectDTO pDTO = new EmployeeDTO.ProjectDTO();
                BeanUtils.copyProperties(p, pDTO);
                return pDTO;
            }).collect(Collectors.toList()));
        }

        return dto;
    }
}
