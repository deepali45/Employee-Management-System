package com.ems.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ems.entity.ProfessionalDetails;

@Repository
public interface ProfessionalDetailsRepository extends JpaRepository<ProfessionalDetails, Long> {

}
