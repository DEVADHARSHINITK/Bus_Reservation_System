package com.example.Bus.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import com.example.Bus.Repository.PassengerRepository;

public class CustomPassengerDetailsService implements UserDetailsService {
    @Autowired
    private PassengerRepository passengerRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return passengerRepository.findByEmail(username).orElseThrow();
    }
}
