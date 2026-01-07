package com.ems.service;

import com.ems.entity.ProfessionalDetails;

public interface ProfessionalDetailsService {
	ProfessionalDetails saveProfessionalDetails(ProfessionalDetails professionalDetails);
	
	ProfessionalDetails getprofessionalDetails(Long profDetailId);

	ProfessionalDetails getByEmployeeId(Long id);
}
