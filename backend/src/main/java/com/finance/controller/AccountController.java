package com.finance.controller;

import com.finance.entity.Account;
import com.finance.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;

    // Add a new card for a specific user
    @PostMapping("/user/{userId}/add")
    public ResponseEntity<Account> addCard(@PathVariable Long userId, @RequestBody Account account) {
        Account savedAccount = accountService.addCard(userId, account);
        return ResponseEntity.ok(savedAccount);
    }

    // Get all cards for a specific user (useful right after they log in)
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Account>> getUserCards(@PathVariable Long userId) {
        List<Account> cards = accountService.getUserCards(userId);
        return ResponseEntity.ok(cards);
    }

    // Update an existing card's details
    @PutMapping("/update/{accountId}")
    public ResponseEntity<Account> updateCard(@PathVariable Long accountId, @RequestBody Account accountDetails) {
        Account updatedAccount = accountService.updateCard(accountId, accountDetails);
        return ResponseEntity.ok(updatedAccount);
    }

    // Remove a card
    @DeleteMapping("/remove/{accountId}")
    public ResponseEntity<String> removeCard(@PathVariable Long accountId) {
        String response = accountService.removeCard(accountId);
        return ResponseEntity.ok(response);
    }
}