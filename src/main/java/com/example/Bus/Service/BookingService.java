package com.example.Bus.Service;

import com.example.Bus.DTO.BookingDTO;
import com.example.Bus.Model.Booking;
import com.example.Bus.Model.Bus;
import com.example.Bus.Model.Users;
import com.example.Bus.Repository.BookingRepository;
import com.example.Bus.Repository.BusRepository;
import com.example.Bus.Repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private UsersRepository userRepository;
    @Autowired
    private BusRepository busRepository;

    public List<Booking> getBookingsByUserId(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    public Booking createBooking(BookingDTO bookingDTO) {
        Users user = (Users) userRepository.findById(bookingDTO.getUserId()).orElseThrow();
        Bus bus = busRepository.findById(bookingDTO.getBusId()).orElseThrow();

        Booking booking = new Booking();
        booking.setUserId(user.getId());
        booking.setBusId(bus.getId());
        booking.setName(bookingDTO.getName());
        booking.setGender(bookingDTO.getGender());
        booking.setContact(bookingDTO.getContact());
        booking.setSource(bookingDTO.getSource());
        booking.setDestination(bookingDTO.getDestination());
        booking.setDate(bookingDTO.getDate());
        booking.setTime(bookingDTO.getTime());

        return bookingRepository.save(booking);
    }
}
