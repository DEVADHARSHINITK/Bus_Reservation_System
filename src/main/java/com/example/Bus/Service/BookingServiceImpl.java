package com.example.Bus.Service;

import com.example.Bus.Model.Booking;
import com.example.Bus.Model.Seat;
import com.example.Bus.Repository.BookingRepository;
import com.example.Bus.Repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BookingServiceImpl implements BookingService{
    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Override
    public Booking bookSeat(Booking booking) {
        Seat seat = seatRepository.findById(booking.getSeatId()).orElseThrow();
        if (seat.isBooked()) throw new RuntimeException("Seat already booked.");
        seat.setBooked(true);
        seatRepository.save(seat);
        booking.setBookingDate(LocalDate.now());
        return bookingRepository.save(booking);
    }

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public List<Booking> getBookingsByPassenger(Long passengerId) {
        return bookingRepository.findByPassengerId(passengerId);
    }

    @Override
    public void cancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId).orElseThrow();
        Seat seat = seatRepository.findById(booking.getSeatId()).orElseThrow();
        seat.setBooked(false);
        seatRepository.save(seat);
        bookingRepository.deleteById(bookingId);
    }
}
