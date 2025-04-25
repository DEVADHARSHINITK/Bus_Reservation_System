package com.example.demo.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
public class Bus {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String busName;

    private int totalSeats;

    private String source;

    private String destination;

    private double cost;

    public Bus()
    {
    	
    }
    public Bus(Long id, String busName, int totalSeats, String source, String destination, double cost) {
		super();
		this.id = id;
		this.busName = busName;
		this.totalSeats = totalSeats;
		this.source = source;
		this.destination = destination;
		this.cost = cost;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getBusName() {
		return busName;
	}

	public void setBusName(String busName) {
		this.busName = busName;
	}

	public int getTotalSeats() {
		return totalSeats;
	}

	public void setTotalSeats(int totalSeats) {
		this.totalSeats = totalSeats;
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

	// Private constructor to enforce builder usage
    private Bus(BusBuilder builder) {
        this.id = builder.id;
        this.busName = builder.busName;
        this.totalSeats = builder.totalSeats;
        this.source = builder.source;
        this.destination = builder.destination;
        this.cost = builder.cost;
    }

    // Static inner builder class for Bus entity
    public static class BusBuilder {
        private Long id;
        private String busName;
        private int totalSeats;
        private String source;
        private String destination;
        private double cost;

        // Builder methods for each field
        public BusBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public BusBuilder busName(String busName) {
            this.busName = busName;
            return this;
        }

        public BusBuilder totalSeats(int totalSeats) {
            this.totalSeats = totalSeats;
            return this;
        }

        public BusBuilder source(String source) {
            this.source = source;
            return this;
        }

        public BusBuilder destination(String destination) {
            this.destination = destination;
            return this;
        }

        public BusBuilder cost(double cost) {
            this.cost = cost;
            return this;
        }

        // Build method to return the Bus entity
        public Bus build() {
            return new Bus(this);
        }
    }
}
