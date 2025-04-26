package com.example.demo.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.BusDTO;
import com.example.demo.Model.Bus;
import com.example.demo.Repository.BusRepository;

@Service
public class BusService {
	@Autowired
    private BusRepository busRepository;
	
	@Autowired
    public BusService(BusRepository busRepository) {
        this.busRepository = busRepository;
    }

	private BusDTO toDTO(Bus bus) {
	    return new BusDTO.BusDTOBuilder()
	            .id(bus.getId())
	            .busName(bus.getBusName())
	            .totalSeats(bus.getTotalSeats())
	            .source(bus.getSource())
	            .destination(bus.getDestination())
	            .cost(bus.getCost())
	            .build();
	}

	// Converting BusDTO to Bus Entity
	private Bus toEntity(BusDTO dto) {
	    return new Bus.BusBuilder()
	            .id(dto.getId())
	            .busName(dto.getBusName())
	            .totalSeats(dto.getTotalSeats())
	            .source(dto.getSource())
	            .destination(dto.getDestination())
	            .cost(dto.getCost())
	            .build();
	}

    public BusDTO addBus(BusDTO dto) {
        Bus saved = busRepository.save(toEntity(dto));
        return toDTO(saved);
    }

    public List<BusDTO> getAllBuses() {
        return busRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public BusDTO updateBus(Long id, BusDTO dto) {
        Bus bus = busRepository.findById(id).orElseThrow(() -> new RuntimeException("Bus not found"));
        bus.setBusName(dto.getBusName());
        bus.setTotalSeats(dto.getTotalSeats());
        bus.setSource(dto.getSource());
        bus.setDestination(dto.getDestination());
        bus.setCost(dto.getCost());
        return toDTO(busRepository.save(bus));
    }
    public void deleteBus(Long id) {
        busRepository.deleteById(id);
    }
    
    public Bus getBusById(Long busId) {
        // Fetching the bus from the database
        Optional<Bus> bus = busRepository.findById(busId);
        if (bus.isPresent()) {
            return bus.get();
        } else {
            throw new RuntimeException("Bus not found with id: " + busId);
        }
    }
    
    public long CountBuses() {
        return busRepository.count();
    }

}
