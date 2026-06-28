package com.finance.service;
import com.finance.entity.User;

public interface UserService {
    String registerUser(User user);
    User loginUser(String username, String password);
}