package com.wipro.marriagehallbooking.exception;

public class HallNotFoundException extends RuntimeException {
    public HallNotFoundException(Long id) {
        super("Hall not found with id " + id);
    }
}
