package com.finance.controller;

import com.finance.entity.User;
import com.finance.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Endpoint for registering a new account
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        String responseMessage = userService.registerUser(user);
        return ResponseEntity.ok(responseMessage);
    }

    // Endpoint for login
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            User loggedInUser = userService.loginUser(loginRequest.username(), loginRequest.password());
            return ResponseEntity.ok(loggedInUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

// A modern Java record to cleanly map the incoming JSON payload for login requests
record LoginRequest(String username, String password) {}