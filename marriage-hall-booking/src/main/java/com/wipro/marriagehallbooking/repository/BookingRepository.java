package com.wipro.marriagehallbooking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.wipro.marriagehallbooking.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
}
