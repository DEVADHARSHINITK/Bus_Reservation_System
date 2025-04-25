package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Model.BookingHistory;
@Repository
public interface BookingHistoryRepository extends JpaRepository<BookingHistory, Long> {
	 List<BookingHistory> findByUserEmail(String email);

}
