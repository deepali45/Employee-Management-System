package com.ems.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ems.entity.Finance;

@Repository
public interface FinanceRepository extends JpaRepository<Finance, Long> {

}
