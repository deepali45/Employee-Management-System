package com.ems.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ems.entity.ProfessionalDetails;
import com.ems.exception.ResourceNotFoundException;
import com.ems.repository.ProfessionalDetailsRepository;

@Service
public class ProfessionalDetailsServiceImpl implements ProfessionalDetailsService {
	
	@Autowired
	private ProfessionalDetailsRepository professionalDetailsRepository;
	
	@Override
	public ProfessionalDetails saveProfessionalDetails(ProfessionalDetails professionalDetails) {
		return professionalDetailsRepository.save(professionalDetails);
	}
	
	@Override
	public ProfessionalDetails getprofessionalDetails(Long profDetailId) {
		   return professionalDetailsRepository.findById(profDetailId).get();
	}
	@Override
    public ProfessionalDetails getByEmployeeId(Long id) {
        return professionalDetailsRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Professional details not found"));
    }


}
