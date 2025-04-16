package com.example.Bus.Service;

import com.example.Bus.DTO.UsersDTO;
import com.example.Bus.Model.Users;
import com.example.Bus.Repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsersService {

    @Autowired
    private UsersRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UsersDTO register(UsersDTO registerRequest){

        UsersDTO reqResObj = new UsersDTO();

        try {

            Users userObj = new Users();

            userObj.setUsername(registerRequest.getUsername());
            userObj.setGender(registerRequest.getGender());
            userObj.setPhoneno(registerRequest.getPhoneno());
            userObj.setEmail(registerRequest.getEmail());
            userObj.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
            userObj.setRole(registerRequest.getRole());

            Users userResult = userRepository.save(userObj);

            if (userResult.getId()>0) {
                reqResObj.setMessage("Registered Successfully");
                reqResObj.setStatusCode(200);
                reqResObj.setUser(userResult);
            }

        }catch (Exception e){
            reqResObj.setError(e.getMessage());
            reqResObj.setStatusCode(500);
        }
        return reqResObj;
    }

    public UsersDTO login(UsersDTO loginRequest){

        UsersDTO reqResObj = new UsersDTO();

        try {
            authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

            var user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow();
            reqResObj.setMessage("Login Successful");
            reqResObj.setStatusCode(200);
            reqResObj.setRole(user.getRole());
        }catch (Exception e){
            reqResObj.setMessage(e.getMessage());
            reqResObj.setStatusCode(500);
        }
        return reqResObj;
    }

    public UsersDTO getAllUsers() {

        UsersDTO reqResObj = new UsersDTO();

        try {
            List<Users> result = userRepository.findAll();

            if (!result.isEmpty()) {
                reqResObj.setUsersList(result);
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

    public UsersDTO deleteUser(Long userid) {
        UsersDTO reqRes = new UsersDTO();
        try {
            Optional<Users> userOptional = userRepository.findById(userid);
            if (userOptional.isPresent()) {
                userRepository.deleteById(userid);
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
