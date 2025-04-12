package com.example.Bus.Controller;

import com.example.Bus.Model.Passenger;
import com.example.Bus.Service.PassengerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/passengers")
public class PassengerController {
    @Autowired
    private PassengerService passengerService;

    @PostMapping
    public Passenger register(@RequestBody Passenger passenger) {
        return passengerService.registerPassenger(passenger);
    }

    @GetMapping
    public List<Passenger> getAll() {
        return passengerService.getAllPassengers();
    }

    @GetMapping("/{id}")
    public Passenger getById(@PathVariable Long id) {
        return passengerService.getPassenger(id);
    }
}
