package com.example.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Model.User;
import com.example.demo.Repository.UserRepository;

@Service
public class UserService {
	 @Autowired
	    private UserRepository userRepository;

	    public User register(User user) {
	        Optional<User> existing = userRepository.findByEmail(user.getEmail());
	        if (existing.isPresent()) {
	            throw new RuntimeException("Email already registered.");
	        }
	        return userRepository.save(user);
	    }

	    public User login(String email, String password) {
	        return userRepository.findByEmail(email)
	                .filter(u -> u.getPassword().equals(password))
	                .orElseThrow(() -> new RuntimeException("Invalid email or password"));
	    }
	    
	    public List<User> getAllUsers() {
	        return userRepository.findAll();
	    }

	    public void deleteUser(Long id) {
	        userRepository.deleteById(id);
	    }

}
