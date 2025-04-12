package com.example.Bus.Service;

import com.example.Bus.Model.Seat;
import com.example.Bus.Repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SeatServiceImpl implements SeatService{
    @Autowired
    private SeatRepository seatRepository;

    @Override
    public List<Seat> getAllSeats() {
        return seatRepository.findAll();
    }

    @Override
    public List<Seat> getSeatsBySchedule(Long scheduleId) {
        return seatRepository.findByScheduleId(scheduleId);
    }

    @Override
    public Seat addSeat(Seat seat) {
        return seatRepository.save(seat);
    }

    @Override
    public Seat updateSeatStatus(Long seatId, boolean booked) {
        Seat seat = seatRepository.findById(seatId).orElseThrow();
        seat.setBooked(booked);
        return seatRepository.save(seat);
    }
}
