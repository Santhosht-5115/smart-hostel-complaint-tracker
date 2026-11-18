package com.campuscomplaint.tracker.scheduler;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.campuscomplaint.tracker.entity.Complaint;
import com.campuscomplaint.tracker.repository.ComplaintRepository;
import com.campuscomplaint.tracker.service.PriorityService;

@Component
public class PriorityScheduler {

    private static final Logger logger =
            LoggerFactory.getLogger(PriorityScheduler.class);

    private final ComplaintRepository complaintRepository;
    private final PriorityService priorityService;

    public PriorityScheduler(
            ComplaintRepository complaintRepository,
            PriorityService priorityService) {

        this.complaintRepository = complaintRepository;
        this.priorityService = priorityService;
    }

    // TEMPORARY TEST INTERVAL: Every 10 seconds.
    @Scheduled(fixedRate = 3600000)
    @Transactional
    public void recalculatePriorityScores() {

        logger.info("Priority recalculation scheduler started.");

        List<Complaint> complaints = complaintRepository.findAll();

        int updatedCount = 0;

        for (Complaint complaint : complaints) {

            // Skip resolved complaints.
            if ("RESOLVED".equalsIgnoreCase(complaint.getStatus())) {
                continue;
            }

            // Calculate the latest priority score.
            int newScore =
                    priorityService.calculatePriorityScore(complaint);

            // Save only if the score has changed.
            if (complaint.getPriorityScore() != newScore) {

                int oldScore = complaint.getPriorityScore();

                complaint.setPriorityScore(newScore);

                complaintRepository.save(complaint);

                updatedCount++;

                logger.info(
                        "Complaint ID {}: priority score changed from {} to {}",
                        complaint.getId(),
                        oldScore,
                        newScore
                );
            }
        }

        logger.info(
                "Priority recalculation completed. Complaints updated: {}",
                updatedCount
        );
    }
}

