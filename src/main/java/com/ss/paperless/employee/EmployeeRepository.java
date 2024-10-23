package com.ss.paperless.employee;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<EmployeeEntity, Integer>{
	Boolean existsByUsername(String username);
	
	//username을 받아 DB 테이블에서 회원을 조회하는 메소드 작성
	EmployeeEntity findByUsername(String username);

	
}
