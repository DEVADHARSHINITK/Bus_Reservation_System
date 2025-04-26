package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.BusDTO;
import com.example.demo.Model.Bus;
import com.example.demo.Repository.BusRepository;
import com.example.demo.Service.BusService;

@RestController
@RequestMapping("/api/buses")
@CrossOrigin("*")
public class BusController {
	@Autowired
    private BusService busService;

	@Autowired
	private BusRepository busRepository;
    // ADMIN: Add Bus
    @PostMapping("/admin")
    public BusDTO addBus(@RequestBody BusDTO dto) {
        return busService.addBus(dto);
    }

    // ADMIN: Update Bus
    @PutMapping("/admin/{id}")
    public BusDTO updateBus(@PathVariable Long id, @RequestBody BusDTO dto) {
        return busService.updateBus(id, dto);
    }

    // ADMIN: Delete Bus
    @DeleteMapping("/admin/{id}")
    public String deleteBus(@PathVariable Long id) {
        busService.deleteBus(id);
        return "Bus deleted successfully";
    }

    // USER & ADMIN: View All Buses
    @GetMapping
    public List<BusDTO> getAllBuses() {
        return busService.getAllBuses();
    }

    @GetMapping("/{busId}")
    public Bus getBusById(@PathVariable Long busId) {
        return busRepository.findById(busId)
                .orElseThrow(() -> new RuntimeException("Bus not found with id: " + busId));
    }
    
    @GetMapping("/count")
    public long countBuses() {
        return busRepository.count();
    }
}
