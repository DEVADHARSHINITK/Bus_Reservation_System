package com.example.demo.Controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.BookingRequestDTO;
import com.example.demo.DTO.BookingResponseDTO;
import com.example.demo.Model.BookingHistory;
import com.example.demo.Repository.BookingHistoryRepository;
import com.example.demo.Service.BookingHistoryService;
import com.example.demo.Service.BookingService;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin("*")
public class BookingHistoryController {
	 @Autowired
	    private BookingHistoryService bookingHisService;
	 
	 @Autowired
	 private BookingService bookingService;
	 
	 @Autowired
	 private BookingHistoryRepository bookingHistoryRepository;

	    @PostMapping("/book")
	    public ResponseEntity<BookingResponseDTO> bookBus(@RequestBody BookingRequestDTO request) {
	        BookingResponseDTO response = bookingHisService.bookBus(request);
	        return ResponseEntity.ok(response);
	    }
	    @GetMapping("/history")
	    public ResponseEntity<List<BookingResponseDTO>> getBookingHistory(@RequestParam String email) {
	        List<BookingResponseDTO> history = bookingService.getBookingHistoryByEmail(email);
	        return ResponseEntity.ok(history);
	    }

	    @GetMapping("/all")
	    public ResponseEntity<List<BookingResponseDTO>> getAllBookings() {
	        List<BookingResponseDTO> allBookings = bookingService.getAllBookings();
	        return ResponseEntity.ok(allBookings);
	    }
	    
	    @GetMapping("/count")
	    public long countBookings() {
	        return bookingHistoryRepository.count();
	    }
	    
	    @GetMapping("/revenue")
	    public ResponseEntity<Double> getTotalRevenue() {
	        double revenue = bookingService.getTotalRevenue();
	        return ResponseEntity.ok(revenue);
	    }
}
