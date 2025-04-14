package com.example.Bus.Controller;

import com.example.Bus.DTO.ReqRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.Bus.Service.PassengerService;

@RestController
@RequestMapping("/api/passengers")
public class PassengerController {
    @Autowired
    private PassengerService passengerService;

    @PostMapping("/register")
    public ResponseEntity<ReqRes> register(@RequestBody ReqRes registerRequest){
        return ResponseEntity.ok(passengerService.register(registerRequest));
    }
    @PostMapping("/login")
    public ResponseEntity<ReqRes> login(@RequestBody ReqRes loginRequest){
        return ResponseEntity.ok(passengerService.login(loginRequest));
    }
    @GetMapping("/passengerList")
    public ResponseEntity<ReqRes> getAllPassengers(){
        return ResponseEntity.ok(passengerService.getAllPassengers());
    }

    @DeleteMapping("/delete/{passengerId}")
    public ResponseEntity<ReqRes> deletePassenger(@PathVariable Long passengerId){
        return ResponseEntity.ok(passengerService.deletePassenger(passengerId));
    }
}
