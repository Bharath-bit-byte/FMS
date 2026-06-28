package com.finance.service.impl;

import com.finance.entity.Account;
import com.finance.entity.User;
import com.finance.repository.AccountRepository;
import com.finance.repository.UserRepository;
import com.finance.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Account addCard(Long userId, Account account) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        account.setUser(user);
        return accountRepository.save(account);
    }

    @Override
    public Account updateCard(Long accountId, Account accountDetails) {
        Account existingAccount = accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Card not found with id: " + accountId));

        existingAccount.setCardNumber(accountDetails.getCardNumber());
        existingAccount.setCardName(accountDetails.getCardName());
        existingAccount.setExpiryDate(accountDetails.getExpiryDate());
        existingAccount.setCvv(accountDetails.getCvv());
        existingAccount.setAmount(accountDetails.getAmount());

        return accountRepository.save(existingAccount);
    }

    @Override
    public String removeCard(Long accountId) {
        if (!accountRepository.existsById(accountId)) {
            return "Card not found.";
        }
        accountRepository.deleteById(accountId);
        return "Card removed successfully.";
    }

    @Override
    public List<Account> getUserCards(Long userId) {
        return accountRepository.findByUserId(userId);
    }
}