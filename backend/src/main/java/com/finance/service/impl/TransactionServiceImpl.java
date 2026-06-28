package com.finance.service.impl;

import com.finance.entity.Account;
import com.finance.entity.Transaction;
import com.finance.entity.User;
import com.finance.repository.AccountRepository;
import com.finance.repository.TransactionRepository;
import com.finance.repository.UserRepository;
import com.finance.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public Transaction processTransaction(Long userId, Transaction transaction) {
        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found."));

        Account account = accountRepository.findByUserIdAndCardName(userId, transaction.getCardName())
                .orElseThrow(() -> new RuntimeException("Card '" + transaction.getCardName() + "' not found for this user."));

        if ("credit".equalsIgnoreCase(transaction.getPaymentType())) {
            account.setAmount(account.getAmount().add(transaction.getAmount()));
            
        } else if ("debit".equalsIgnoreCase(transaction.getPaymentType())) {
            if (account.getAmount().compareTo(transaction.getAmount()) < 0) {
                throw new RuntimeException("Insufficient balance on card: " + account.getCardName());
            }
            account.setAmount(account.getAmount().subtract(transaction.getAmount()));
            
        } else {
            throw new RuntimeException("Invalid payment type. Must be 'credit' or 'debit'.");
        }

        accountRepository.save(account);

        transaction.setUser(user);
        return transactionRepository.save(transaction);
    }

    @Override
    public List<Transaction> getUserTransactions(Long userId) {
        return transactionRepository.findByUserId(userId);
    }
}