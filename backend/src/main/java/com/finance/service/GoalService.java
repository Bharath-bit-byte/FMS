package com.finance.service;

import com.finance.entity.Goal;
import java.util.List;

public interface GoalService {
    Goal addGoal(Long userId, Goal goal);
    List<Goal> getUserGoals(Long userId);
    Goal updateGoal(Long goalId, Goal goalDetails);
    String deleteGoal(Long goalId);
}