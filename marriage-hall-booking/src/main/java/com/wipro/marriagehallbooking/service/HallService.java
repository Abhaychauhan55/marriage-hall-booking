package com.wipro.marriagehallbooking.service;

import com.wipro.marriagehallbooking.entity.Hall;
import com.wipro.marriagehallbooking.repository.HallRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HallService {

    private final HallRepository hallRepository;

    public HallService(HallRepository hallRepository) {
        this.hallRepository = hallRepository;
    }

    // CREATE Hall
    public Hall createHall(Hall hall) {
        return hallRepository.save(hall);
    }

    // READ All Halls
    public List<Hall> getAllHalls() {
        return hallRepository.findAll();
    }

    // READ Hall by ID
    public Hall getHallById(Long id) {
        return hallRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hall not found with id " + id));
    }

    // UPDATE Hall
    public Hall updateHall(Long id, Hall hallDetails) {
        Hall hall = hallRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hall not found with id " + id));

        hall.setName(hallDetails.getName());
        hall.setLocation(hallDetails.getLocation());
        hall.setCapacity(hallDetails.getCapacity());

        return hallRepository.save(hall);
    }

    // DELETE Hall
    public void deleteHall(Long id) {
        Hall hall = hallRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hall not found with id " + id));
        hallRepository.delete(hall);
    }
}
