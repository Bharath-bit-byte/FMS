package com.finance.service.impl;

import com.finance.entity.Bill;
import com.finance.entity.User;
import com.finance.repository.BillRepository;
import com.finance.repository.UserRepository;
import com.finance.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BillServiceImpl implements BillService {

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Bill addBill(Long userId, Bill bill) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        bill.setUser(user);
        bill.setStatus("PENDING");
        return billRepository.save(bill);
    }

    @Override
    public List<Bill> getUpcomingBills(Long userId) {
        return billRepository.findByUserIdAndStatusOrderByDueDateAsc(userId, "PENDING");
    }

    @Override
    public List<Bill> getBillHistory(Long userId) {
        return billRepository.findByUserIdAndStatusOrderByDueDateAsc(userId, "PAID");
    }

    @Override
    public List<Bill> getReminders(Long userId, int daysInAdvance) {
        LocalDate targetDate = LocalDate.now().plusDays(daysInAdvance);
        return billRepository.findByUserIdAndStatusAndDueDateLessThanEqual(userId, "PENDING", targetDate);
    }

    @Override
    public Bill markBillAsPaid(Long billId) {
        Bill bill = billRepository.findById(billId)
                .orElseThrow(() -> new RuntimeException("Bill not found."));
        
        bill.setStatus("PAID");
        return billRepository.save(bill);
    }

    @Override
    public String deleteBill(Long billId) {
        if (!billRepository.existsById(billId)) {
            return "Bill not found.";
        }
        billRepository.deleteById(billId);
        return "Bill removed successfully.";
    }
}