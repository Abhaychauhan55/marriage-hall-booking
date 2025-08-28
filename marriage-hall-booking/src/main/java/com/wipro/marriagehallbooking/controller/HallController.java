package com.wipro.marriagehallbooking.controller;

import com.wipro.marriagehallbooking.entity.Hall;
import com.wipro.marriagehallbooking.service.HallService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/halls")
public class HallController {

    private final HallService hallService;

    public HallController(HallService hallService) {
        this.hallService = hallService;
    }

    // CREATE Hall
    @PostMapping
    public ResponseEntity<Hall> createHall(@Valid @RequestBody Hall hall) {
        return ResponseEntity.status(201).body(hallService.createHall(hall));
    }

    // READ All Halls
    @GetMapping
    public ResponseEntity<List<Hall>> getAllHalls() {
        return ResponseEntity.ok(hallService.getAllHalls());
    }

    // READ Hall by ID
    @GetMapping("/{id}")
    public ResponseEntity<Hall> getHallById(@PathVariable Long id) {
        return ResponseEntity.ok(hallService.getHallById(id));
    }

    // UPDATE Hall
    @PutMapping("/{id}")
    public ResponseEntity<Hall> updateHall(@PathVariable Long id, @Valid @RequestBody Hall hallDetails) {
        return ResponseEntity.ok(hallService.updateHall(id, hallDetails));
    }

    // DELETE Hall
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteHall(@PathVariable Long id) {
        hallService.deleteHall(id);
        return ResponseEntity.ok("{\"message\": \"Hall with ID " + id + " has been deleted.\"}");
    }
}
