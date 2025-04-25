package com.example.demo.DTO;

import java.time.LocalDate;
import java.util.List;

import com.example.demo.Model.Passenger;

public class BookingRequestDTO {
	 private Long busId;
	    private String travelDate;
	    private int numberOfSeats;
	    private String userEmail;
	    private List<PassengerDTO> passengers;
		public Long getBusId() {
			return busId;
		}
		public void setBusId(Long busId) {
			this.busId = busId;
		}
		public String getTravelDate() {
			return travelDate;
		}
		public void setTravelDate(String travelDate) {
			this.travelDate = travelDate;
		}
		public int getNumberOfSeats() {
			return numberOfSeats;
		}
		public void setNumberOfSeats(int numberOfSeats) {
			this.numberOfSeats = numberOfSeats;
		}
		public String getUserEmail() {
			return userEmail;
		}
		public void setUserEmail(String userEmail) {
			this.userEmail = userEmail;
		}
		public List<PassengerDTO> getPassengers() {
			return passengers;
		}
		public void setPassengers(List<PassengerDTO> passengers) {
			this.passengers = passengers;
		}
	    
	    

}
