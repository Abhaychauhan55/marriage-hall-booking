package com.wipro.marriagehallbooking.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wipro.marriagehallbooking.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{


}
