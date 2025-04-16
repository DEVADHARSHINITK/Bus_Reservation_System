package com.example.Bus.Controller;

import com.example.Bus.DTO.UsersDTO;
import com.example.Bus.Service.BusService;
import com.example.Bus.Service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
public class UsersController {
    @Autowired
    private UsersService userService;

    @Autowired
    private BusService productService;

    @PostMapping("/register")
    public ResponseEntity<UsersDTO> register(@RequestBody UsersDTO registerRequest){
        return ResponseEntity.ok(userService.register(registerRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<UsersDTO> login(@RequestBody UsersDTO loginRequest){
        return ResponseEntity.ok(userService.login(loginRequest));
    }

    @GetMapping("/userList")
    public ResponseEntity<UsersDTO> getAllUsers(){
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<UsersDTO> deleteUSer(@PathVariable Long userId){
        return ResponseEntity.ok(userService.deleteUser(userId));
    }

}
