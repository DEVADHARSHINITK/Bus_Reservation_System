package com.example.Bus.Controller;

import com.example.Bus.Model.Seat;
import com.example.Bus.Service.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/seats")
public class SeatController {
    @Autowired
    private SeatService seatService;

    @GetMapping
    public List<Seat> getAllSeats() {
        return seatService.getAllSeats();
    }

    @GetMapping("/schedule/{scheduleId}")
    public List<Seat> getSeatsBySchedule(@PathVariable Long scheduleId) {
        return seatService.getSeatsBySchedule(scheduleId);
    }

    @PostMapping
    public Seat addSeat(@RequestBody Seat seat) {
        return seatService.addSeat(seat);
    }

    @PutMapping("/{seatId}/status")
    public Seat updateSeatStatus(@PathVariable Long seatId, @RequestParam boolean booked) {
        return seatService.updateSeatStatus(seatId, booked);
    }
}
