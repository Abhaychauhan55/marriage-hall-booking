package com.wipro.marriagehallbooking.service;

import com.wipro.marriagehallbooking.dto.BookingRequest;
import com.wipro.marriagehallbooking.entity.Booking;
import com.wipro.marriagehallbooking.entity.Hall;
import com.wipro.marriagehallbooking.entity.User;
import com.wipro.marriagehallbooking.exception.BookingNotFoundException;
import com.wipro.marriagehallbooking.exception.HallNotFoundException;
import com.wipro.marriagehallbooking.exception.UserNotFoundException;
import com.wipro.marriagehallbooking.repository.BookingRepository;
import com.wipro.marriagehallbooking.repository.HallRepository;
import com.wipro.marriagehallbooking.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final HallRepository hallRepository;
    private final UserRepository userRepository;

    public BookingService(BookingRepository bookingRepository,
                          HallRepository hallRepository,
                          UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.hallRepository = hallRepository;
        this.userRepository = userRepository;
    }

    // CREATE
    public Booking createBooking(BookingRequest bookingRequest) {
        Hall hall = hallRepository.findById(bookingRequest.getHallId())
                .orElseThrow(() -> new HallNotFoundException(bookingRequest.getHallId()));

        User user = userRepository.findById(bookingRequest.getUserId())
                .orElseThrow(() -> new UserNotFoundException(bookingRequest.getUserId()));

        Booking booking = new Booking();
        booking.setUserName(bookingRequest.getUserName()); // <== important for @NotBlank
        booking.setDate(bookingRequest.getDate());
        booking.setStatus(bookingRequest.getStatus());
        booking.setHall(hall);
        booking.setUser(user);

        return bookingRepository.save(booking);
    }

    // READ ALL
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // READ BY ID
    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new BookingNotFoundException(id));
    }

    // UPDATE
    public Booking updateBooking(Long id, Booking bookingDetails) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new BookingNotFoundException(id));

        if (bookingDetails.getUserName() != null) booking.setUserName(bookingDetails.getUserName());
        if (bookingDetails.getDate() != null) booking.setDate(bookingDetails.getDate());
        if (bookingDetails.getStatus() != null) booking.setStatus(bookingDetails.getStatus());

        if (bookingDetails.getHall() != null && bookingDetails.getHall().getId() != null) {
            Long hallId = bookingDetails.getHall().getId();
            Hall hall = hallRepository.findById(hallId)
                    .orElseThrow(() -> new HallNotFoundException(hallId));
            booking.setHall(hall);
        }

        if (bookingDetails.getUser() != null && bookingDetails.getUser().getId() != null) {
            Long userId = bookingDetails.getUser().getId();
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new UserNotFoundException(userId));
            booking.setUser(user);
        }

        return bookingRepository.save(booking);
    }

    // DELETE
    public void deleteBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new BookingNotFoundException(id));
        bookingRepository.delete(booking);
    }
}
