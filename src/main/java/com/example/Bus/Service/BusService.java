package com.example.Bus.Service;

import com.example.Bus.Exception.ResourceNotFoundException;
import com.example.Bus.Model.Bus;
import com.example.Bus.Repository.BusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class BusService {
    @Autowired
    private BusRepository busRepository;

    public List<Bus> getAllBuses() {
        return busRepository.findAll();
    }

    public Bus addBus(Bus bus) {
        return busRepository.save(bus);
    }

    public Bus updateBus(Long id, Bus updatedBus) {
        return busRepository.findById(id).map(bus -> {
            bus.setBusName(updatedBus.getBusName());
            bus.setTotalSeats(updatedBus.getTotalSeats());
            return busRepository.save(bus);
        }).orElseThrow(() -> new ResourceNotFoundException("Bus not found with id " + id));
    }
}
