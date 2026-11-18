
package com.campuscomplaint.tracker.service;

import java.time.Duration;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.campuscomplaint.tracker.entity.Complaint;

@Service
public class PriorityService {

    private static final int MAX_WAITING_BONUS = 30;
    private static final int WAITING_BONUS_PER_DAY = 5;

    public int calculatePriorityScore(Complaint complaint) {

        // Do not recalculate the score of resolved complaints.
        if ("RESOLVED".equalsIgnoreCase(complaint.getStatus())) {
            return complaint.getPriorityScore();
        }

        int baseScore;

        // Determine the base score from complaint severity.
        switch (complaint.getSeverity().toUpperCase()) {

            case "LOW":
                baseScore = 10;
                break;

            case "MEDIUM":
                baseScore = 20;
                break;

            case "HIGH":
                baseScore = 30;
                break;

            case "CRITICAL":
                baseScore = 40;
                break;

            default:
                throw new IllegalArgumentException(
                    "Invalid complaint severity: "
                    + complaint.getSeverity()
                );
        }

        int waitingBonus = 0;

        LocalDateTime createdAt = complaint.getCreatedAt();

        // Calculate the waiting-time bonus for existing complaints.
        if (createdAt != null) {

            long waitingDays = Duration.between(
                createdAt,
                LocalDateTime.now()
            ).toHours() / 24;

            waitingBonus = (int) Math.min(
                waitingDays * WAITING_BONUS_PER_DAY,
                MAX_WAITING_BONUS
            );
        }

        return baseScore + waitingBonus;
    }
}

