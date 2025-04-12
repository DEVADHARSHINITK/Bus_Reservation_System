package com.example.Bus.Service;


import com.example.Bus.Model.Schedule;

import java.time.LocalDate;
import java.util.List;

public interface ScheduleService {
    List<Schedule> getAllSchedules();
    Schedule addSchedule(Schedule schedule);
    void deleteSchedule(Long id);
    List<Schedule> getSchedulesByDate(LocalDate date);
}
