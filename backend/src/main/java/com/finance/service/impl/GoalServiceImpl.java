package com.finance.service.impl;

import com.finance.entity.Goal;
import com.finance.entity.User;
import com.finance.repository.GoalRepository;
import com.finance.repository.UserRepository;
import com.finance.service.GoalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GoalServiceImpl implements GoalService {

    @Autowired
    private GoalRepository goalRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Goal addGoal(Long userId, Goal goal) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        goal.setUser(user);
        return goalRepository.save(goal);
    }

    @Override
    public List<Goal> getUserGoals(Long userId) {
        return goalRepository.findByUserId(userId);
    }

    @Override
    public Goal updateGoal(Long goalId, Goal goalDetails) {
        Goal existingGoal = goalRepository.findById(goalId)
                .orElseThrow(() -> new RuntimeException("Goal not found with id: " + goalId));

        existingGoal.setCategory(goalDetails.getCategory());
        existingGoal.setAmount(goalDetails.getAmount());

        return goalRepository.save(existingGoal);
    }

    @Override
    public String deleteGoal(Long goalId) {
        if (!goalRepository.existsById(goalId)) {
            return "Goal not found.";
        }
        goalRepository.deleteById(goalId);
        return "Goal removed successfully.";
    }
}