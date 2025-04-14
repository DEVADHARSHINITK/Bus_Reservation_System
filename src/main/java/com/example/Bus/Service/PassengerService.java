package com.example.Bus.Service;

import com.example.Bus.Model.Passenger;
import com.example.Bus.Repository.PassengerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.Bus.DTO.ReqRes;
import java.util.List;
import java.util.Optional;

@Service
public class PassengerService {

    @Autowired
    private PassengerRepository passengerRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public ReqRes register(ReqRes registerRequest){

        ReqRes reqResObj = new ReqRes();

        try {

            Passenger userObj = new Passenger();

            userObj.setName(registerRequest.getName());
            userObj.setGender(registerRequest.getGender());
            userObj.setPhone(registerRequest.getPhone());
            userObj.setEmail(registerRequest.getEmail());
            userObj.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
            userObj.setRole(registerRequest.getRole());

            Passenger userResult = passengerRepository.save(userObj);

            if (userResult.getId()>0) {
                reqResObj.setMessage("Registered Successfully");
                reqResObj.setStatusCode(200);
                reqResObj.setPassenger((userResult));
            }

        }catch (Exception e){
            reqResObj.setError(e.getMessage());
            reqResObj.setStatusCode(500);
        }
        return reqResObj;
    }

    public ReqRes login(ReqRes loginRequest){

        ReqRes reqResObj = new ReqRes();

        try {
            authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

            var user = passengerRepository.findByEmail(loginRequest.getEmail()).orElseThrow();
            reqResObj.setMessage("Login Successful");
            reqResObj.setStatusCode(200);
            reqResObj.setRole(user.getRole());
        }catch (Exception e){
            reqResObj.setMessage(e.getMessage());
            reqResObj.setStatusCode(500);
        }
        return reqResObj;
    }

    public ReqRes getAllPassengers() {

        ReqRes reqResObj = new ReqRes();

        try {
            List<Passenger> result = passengerRepository.findAll();

            if (!result.isEmpty()) {
                reqResObj.setPassengerList(result);
                reqResObj.setMessage("Get all user success");
                reqResObj.setStatusCode(200);
            } else {
                reqResObj.setMessage("Not found");
                reqResObj.setStatusCode(404);
            }
            return reqResObj;

        } catch (Exception e) {
            reqResObj.setMessage("Error occurred: " + e.getMessage());
            reqResObj.setStatusCode(500);
            return reqResObj;
        }
    }

    public ReqRes deletePassenger(Long passengerId) {
        ReqRes reqRes = new ReqRes();
        try {
            Optional<Passenger> userOptional = passengerRepository.findById(passengerId);
            if (userOptional.isPresent()) {
                passengerRepository.deleteById(passengerId);
                reqRes.setStatusCode(200);
                reqRes.setMessage("User deleted successfully");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("User not found for deletion");
            }
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred while deleting user: " + e.getMessage());
        }
        return reqRes;
    }

}

