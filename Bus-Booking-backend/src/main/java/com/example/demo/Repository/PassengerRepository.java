package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Model.Passenger;
@Repository
public interface PassengerRepository extends JpaRepository<Passenger, Long> {

}
