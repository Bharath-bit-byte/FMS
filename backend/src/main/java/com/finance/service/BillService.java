package com.finance.service;

import com.finance.entity.Bill;
import java.util.List;

public interface BillService {
    Bill addBill(Long userId, Bill bill);
    List<Bill> getUpcomingBills(Long userId);
    List<Bill> getBillHistory(Long userId);
    List<Bill> getReminders(Long userId, int daysInAdvance);
    Bill markBillAsPaid(Long billId);
    String deleteBill(Long billId);
}