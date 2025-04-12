package com.example.Bus.Repository;

import com.example.Bus.Model.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findByTravelDate(LocalDate travelDate);
}
