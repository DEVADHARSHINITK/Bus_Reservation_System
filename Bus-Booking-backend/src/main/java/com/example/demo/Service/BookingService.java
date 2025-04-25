package com.example.demo.Service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.BookingResponseDTO;
import com.example.demo.DTO.PassengerDTO;
import com.example.demo.Model.BookingHistory;
import com.example.demo.Repository.BookingHistoryRepository;

@Service
public class BookingService {
	@Autowired
    private BookingHistoryRepository bookingRepository;

    public List<BookingResponseDTO> getBookingHistoryByEmail(String userEmail) {
        List<BookingHistory> bookings = bookingRepository.findByUserEmail(userEmail);
        
        return bookings.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private BookingResponseDTO convertToDTO(BookingHistory booking) {
        BookingResponseDTO dto = new BookingResponseDTO();
        dto.setBookingId(booking.getId());
        dto.setBusName(booking.getBusName());
        dto.setSource(booking.getSource());
        dto.setDestination(booking.getDestination());
        dto.setCost(booking.getCost());
        dto.setTravelDate(booking.getTravelDate().toString()); // Assuming LocalDate
        dto.setNumberOfSeats(booking.getNumberOfSeats());
        dto.setUserEmail(booking.getUserEmail());

        List<PassengerDTO> passengers = booking.getPassengers().stream().map(passenger -> {
            PassengerDTO pdto = new PassengerDTO();
            pdto.setName(passenger.getName());
            pdto.setGender(passenger.getGender());
            return pdto;
        }).collect(Collectors.toList());

        dto.setPassengers(passengers);

        return dto;
    }

}
