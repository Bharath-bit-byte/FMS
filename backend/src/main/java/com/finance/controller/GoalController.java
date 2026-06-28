package com.finance.controller;

import com.finance.entity.Goal;
import com.finance.service.GoalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/goals")
public class GoalController {

    @Autowired
    private GoalService goalService;

    @PostMapping("/user/{userId}/add")
    public ResponseEntity<Goal> addGoal(@PathVariable Long userId, @RequestBody Goal goal) {
        Goal savedGoal = goalService.addGoal(userId, goal);
        return ResponseEntity.ok(savedGoal);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Goal>> getUserGoals(@PathVariable Long userId) {
        List<Goal> goals = goalService.getUserGoals(userId);
        return ResponseEntity.ok(goals);
    }

    @PutMapping("/update/{goalId}")
    public ResponseEntity<Goal> updateGoal(@PathVariable Long goalId, @RequestBody Goal goalDetails) {
        Goal updatedGoal = goalService.updateGoal(goalId, goalDetails);
        return ResponseEntity.ok(updatedGoal);
    }

    @DeleteMapping("/delete/{goalId}")
    public ResponseEntity<String> deleteGoal(@PathVariable Long goalId) {
        String responseMessage = goalService.deleteGoal(goalId);
        return ResponseEntity.ok(responseMessage);
    }
}