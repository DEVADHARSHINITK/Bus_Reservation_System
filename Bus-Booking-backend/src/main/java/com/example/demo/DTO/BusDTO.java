package com.example.demo.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
public class BusDTO {
	private Long busId;
    private String busName;
    private int totalSeats;
    private String source;
    private String destination;
    private double cost;

    // Private constructor to enforce the use of the builder
    private BusDTO(BusDTOBuilder builder) {
        this.busId = builder.id;
        this.busName = builder.busName;
        this.totalSeats = builder.totalSeats;
        this.source = builder.source;
        this.destination = builder.destination;
        this.cost = builder.cost;
    }

    public BusDTO()
    {
    	
    }
    // Getters for all fields
    public Long getId() {
        return busId;
    }

    public String getBusName() {
        return busName;
    }

    public int getTotalSeats() {
        return totalSeats;
    }

    public String getSource() {
        return source;
    }

    public String getDestination() {
        return destination;
    }

    public double getCost() {
        return cost;
    }

    // Static builder class for BusDTO
    public static class BusDTOBuilder {
        private Long id;
        private String busName;
        private int totalSeats;
        private String source;
        private String destination;
        private double cost;

        // Setters for each property to chain them
        public BusDTOBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public BusDTOBuilder busName(String busName) {
            this.busName = busName;
            return this;
        }

        public BusDTOBuilder totalSeats(int totalSeats) {
            this.totalSeats = totalSeats;
            return this;
        }

        public BusDTOBuilder source(String source) {
            this.source = source;
            return this;
        }

        public BusDTOBuilder destination(String destination) {
            this.destination = destination;
            return this;
        }

        public BusDTOBuilder cost(double cost) {
            this.cost = cost;
            return this;
        }

        // Build method to return the BusDTO instance
        public BusDTO build() {
            return new BusDTO(this);
        }
    }

}
