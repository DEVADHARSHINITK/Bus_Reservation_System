package com.example.demo.Model;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Passenger {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String gender;

    @ManyToOne
    @JoinColumn(name = "booking_id")
    private BookingHistory bookingHistory;

	public Passenger(Long id, String name, String gender, BookingHistory bookingHistory) {
		super();
		this.id = id;
		this.name = name;
		this.gender = gender;
		this.bookingHistory = bookingHistory;
	}
    public Passenger()
    {
    	
    }
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public BookingHistory getBookingHistory() {
		return bookingHistory;
	}
	public void setBookingHistory(BookingHistory bookingHistory) {
		this.bookingHistory = bookingHistory;
	}
	
}
