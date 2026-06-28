package com.finance.controller;

import com.finance.entity.Bill;
import com.finance.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bills")
public class BillController {

    @Autowired
    private BillService billService;

    @PostMapping("/user/{userId}/add")
    public ResponseEntity<Bill> addBill(@PathVariable Long userId, @RequestBody Bill bill) {
        Bill savedBill = billService.addBill(userId, bill);
        return ResponseEntity.ok(savedBill);
    }
    
    @GetMapping("/user/{userId}/upcoming")
    public ResponseEntity<List<Bill>> getUpcomingBills(@PathVariable Long userId) {
        return ResponseEntity.ok(billService.getUpcomingBills(userId));
    }

    @GetMapping("/user/{userId}/history")
    public ResponseEntity<List<Bill>> getBillHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(billService.getBillHistory(userId));
    }

    @GetMapping("/user/{userId}/reminders")
    public ResponseEntity<List<Bill>> getReminders(@PathVariable Long userId, @RequestParam(defaultValue = "7") int days) {
        return ResponseEntity.ok(billService.getReminders(userId, days));
    }
    
    @PutMapping("/{billId}/pay")
    public ResponseEntity<Bill> payBill(@PathVariable Long billId) {
        return ResponseEntity.ok(billService.markBillAsPaid(billId));
    }
    
    @DeleteMapping("/{billId}")
    public ResponseEntity<String> deleteBill(@PathVariable Long billId) {
        return ResponseEntity.ok(billService.deleteBill(billId));
    }
}