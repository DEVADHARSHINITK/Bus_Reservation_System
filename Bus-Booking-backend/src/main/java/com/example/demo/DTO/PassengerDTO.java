package com.example.demo.DTO;

public class PassengerDTO {
	private String name;
    private String gender;
	public PassengerDTO(String name, String gender) {
		super();
		this.name = name;
		this.gender = gender;
	}
    public PassengerDTO()
    {
    	
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
    

}
