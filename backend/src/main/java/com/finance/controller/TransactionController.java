package com.finance.controller;

import com.finance.entity.Transaction;
import com.finance.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    // Process a new transaction for a specific user
    @PostMapping("/user/{userId}/process")
    public ResponseEntity<?> processTransaction(@PathVariable Long userId, @RequestBody Transaction transaction) {
        try {
            Transaction savedTransaction = transactionService.processTransaction(userId, transaction);
            return ResponseEntity.ok(savedTransaction);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Get all transaction history for a specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Transaction>> getUserTransactions(@PathVariable Long userId) {
        List<Transaction> transactions = transactionService.getUserTransactions(userId);
        return ResponseEntity.ok(transactions);
    }
}