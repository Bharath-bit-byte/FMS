package com.finance.service;

import com.finance.entity.Account;
import java.util.List;

public interface AccountService {
    Account addCard(Long userId, Account account);
    Account updateCard(Long accountId, Account accountDetails);
    String removeCard(Long accountId);
    List<Account> getUserCards(Long userId);
}