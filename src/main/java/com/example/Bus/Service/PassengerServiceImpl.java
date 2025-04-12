package com.example.Bus.Service;

import com.example.Bus.Model.Passenger;
import com.example.Bus.Repository.PassengerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class PassengerServiceImpl implements PassengerService{
    @Autowired
    private PassengerRepository passengerRepository;

    @Override
    public Passenger registerPassenger(Passenger passenger) {
        return passengerRepository.save(passenger);
    }

    @Override
    public List<Passenger> getAllPassengers() {
        return passengerRepository.findAll();
    }

    @Override
    public Passenger getPassenger(Long id) {
        return passengerRepository.findById(id).orElseThrow();
    }
}
