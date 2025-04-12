package com.example.Bus.Service;

import com.example.Bus.Model.Seat;

import java.util.List;

public interface SeatService {
    List<Seat> getAllSeats();
    List<Seat> getSeatsBySchedule(Long scheduleId);
    Seat addSeat(Seat seat);
    Seat updateSeatStatus(Long seatId, boolean booked);
}
