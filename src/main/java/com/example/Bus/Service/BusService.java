package com.example.Bus.Service;

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

        public void deleteBus(Long id) {
            busRepository.deleteById(id);
        }
    }
