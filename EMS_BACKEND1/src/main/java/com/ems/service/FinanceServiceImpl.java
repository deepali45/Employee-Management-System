package com.ems.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.ems.entity.Finance;
import com.ems.repository.FinanceRepository;

@Service
public class FinanceServiceImpl implements FinanceService {
	
	@Autowired
	private FinanceRepository financeRepository; 

	@Override
	public Finance saveFinanceDetails(Finance finance) {
		return financeRepository.save(finance);
	}

}
