package com.example.demo.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.BookingRequestDTO;
import com.example.demo.DTO.BookingResponseDTO;
import com.example.demo.DTO.PassengerDTO;
import com.example.demo.Model.BookingHistory;
import com.example.demo.Model.Bus;
import com.example.demo.Model.Passenger;
import com.example.demo.Repository.BookingHistoryRepository;
import com.example.demo.Repository.BusRepository;
import com.example.demo.Repository.PassengerRepository;

@Service
public class BookingHistoryService {
	 @Autowired
	    private BookingHistoryRepository bookingRepo;

	    @Autowired
	    private PassengerRepository passengerRepo;

	    @Autowired
	    private BusRepository busRepository;

	    public BookingResponseDTO bookBus(BookingRequestDTO request) {
	        Bus bus = busRepository.findById(request.getBusId())
	                .orElseThrow(() -> new RuntimeException("Bus not found"));

	        BookingHistory booking = new BookingHistory();
	        booking.setBusId(bus.getId());
	        booking.setBusName(bus.getBusName());
	        booking.setSource(bus.getSource());
	        booking.setDestination(bus.getDestination());
	        booking.setCost(bus.getCost());
	        booking.setTravelDate(request.getTravelDate());
	        booking.setNumberOfSeats(request.getNumberOfSeats());
	        booking.setUserEmail(request.getUserEmail());

	        List<Passenger> passengerList = new ArrayList<>();
	        for (PassengerDTO dto : request.getPassengers()) {
	            Passenger p = new Passenger();
	            p.setName(dto.getName());
	            p.setGender(dto.getGender());
	            p.setBookingHistory(booking);
	            passengerList.add(p);
	        }

	        booking.setPassengers(passengerList);
	        BookingHistory saved = bookingRepo.save(booking);

	        BookingResponseDTO response = new BookingResponseDTO();
	        response.setBookingId(saved.getId());
	        response.setBusName(saved.getBusName());
	        response.setSource(saved.getSource());
	        response.setDestination(saved.getDestination());
	        response.setCost(saved.getCost());
	        response.setTravelDate(saved.getTravelDate());
	        response.setNumberOfSeats(saved.getNumberOfSeats());
	        response.setUserEmail(saved.getUserEmail());

	        List<PassengerDTO> passengerDTOs = saved.getPassengers().stream()
	            .map(p -> {
	                PassengerDTO pdto = new PassengerDTO();
	                pdto.setName(p.getName());
	                pdto.setGender(p.getGender());
	                return pdto;
	            })
	            .toList();
	        response.setPassengers(passengerDTOs);

	        return response;
	    }

}
