package com.finance.service.impl;

import com.finance.entity.User;
import com.finance.repository.UserRepository;
import com.finance.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public String registerUser(User user) {
        // Check if the username is already taken
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return "Registration failed: Username is already taken.";
        }
        
        // Save the user to the MySQL database
        userRepository.save(user);
        return "User registered successfully.";
    }

    @Override
    public User loginUser(String username, String password) {
        User existingUser = userRepository.findByUsername(username);
        if (existingUser == null) {
            throw new RuntimeException("User not found.");
        }
        if (existingUser.getPassword().equals(password)) {
            return existingUser;
        } else {
            throw new RuntimeException("Invalid password.");
        }
    }
}