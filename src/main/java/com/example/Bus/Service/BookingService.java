package com.example.Bus.Service;

import com.example.Bus.Model.Booking;

import java.util.List;

public interface BookingService {
    Booking bookSeat(Booking booking);
    List<Booking> getAllBookings();
    List<Booking> getBookingsByPassenger(Long passengerId);
    void cancelBooking(Long bookingId);
}
