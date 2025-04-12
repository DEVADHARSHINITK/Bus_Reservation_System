package com.example.Bus.Service;

import com.example.Bus.Model.Bus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BusService {
    List<Bus> getAllBuses();
    Bus addBus(Bus bus);
    void deleteBus(Long id);
}
