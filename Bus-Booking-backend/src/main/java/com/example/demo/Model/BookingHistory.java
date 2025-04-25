package com.example.demo.Model;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class BookingHistory {

	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private Long busId;
	    private String busName;
	    private String source;
	    private String destination;
	    private double cost;
	    private String travelDate;
	    private int numberOfSeats;
	    private String userEmail;

	    @OneToMany(mappedBy = "bookingHistory", cascade = CascadeType.ALL)
	    private List<Passenger> passengers = new ArrayList<>();

		public BookingHistory(Long id, Long busId, String busName, String source, String destination, double cost,
				String travelDate, int numberOfSeats, String userEmail, List<Passenger> passengers) {
			super();
			this.id = id;
			this.busId = busId;
			this.busName = busName;
			this.source = source;
			this.destination = destination;
			this.cost = cost;
			this.travelDate = travelDate;
			this.numberOfSeats = numberOfSeats;
			this.userEmail = userEmail;
			this.passengers = passengers;
		}
	    
	    public BookingHistory()
	    {
	    	
	    }

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public Long getBusId() {
			return busId;
		}

		public void setBusId(Long busId) {
			this.busId = busId;
		}

		public String getBusName() {
			return busName;
		}

		public void setBusName(String busName) {
			this.busName = busName;
		}

		public String getSource() {
			return source;
		}

		public void setSource(String source) {
			this.source = source;
		}

		public String getDestination() {
			return destination;
		}

		public void setDestination(String destination) {
			this.destination = destination;
		}

		public double getCost() {
			return cost;
		}

		public void setCost(double cost) {
			this.cost = cost;
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

		public List<Passenger> getPassengers() {
			return passengers;
		}

		public void setPassengers(List<Passenger> passengers) {
			this.passengers = passengers;
		}
	    
	    
}
