package com.example.Bus.Service;

import com.example.Bus.Model.Passenger;

import java.util.List;

public interface PassengerService {
    Passenger registerPassenger(Passenger passenger);
    List<Passenger> getAllPassengers();
    Passenger getPassenger(Long id);
}
