package com.finance.service;

import com.finance.entity.Transaction;
import java.util.List;

public interface TransactionService {
    Transaction processTransaction(Long userId, Transaction transaction);
    List<Transaction> getUserTransactions(Long userId);
}