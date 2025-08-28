package com.wipro.marriagehallbooking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.wipro.marriagehallbooking.entity.Hall;

public interface HallRepository extends JpaRepository<Hall, Long> {
}
 