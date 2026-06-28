package com.finance.repository;

import com.finance.entity.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {
    
    List<Bill> findByUserId(Long userId);

    List<Bill> findByUserIdAndStatusOrderByDueDateAsc(Long userId, String status);

    List<Bill> findByUserIdAndStatusAndDueDateLessThanEqual(Long userId, String status, LocalDate targetDate);
}