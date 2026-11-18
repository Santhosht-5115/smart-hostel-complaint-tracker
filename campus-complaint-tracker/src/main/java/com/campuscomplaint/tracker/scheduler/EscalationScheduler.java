package com.campuscomplaint.tracker.scheduler;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.campuscomplaint.tracker.entity.Complaint;
import com.campuscomplaint.tracker.repository.ComplaintRepository;

@Component
public class EscalationScheduler {

    private static final Logger logger =
            LoggerFactory.getLogger(EscalationScheduler.class);

    private final ComplaintRepository complaintRepository;

    public EscalationScheduler(
            ComplaintRepository complaintRepository) {
        this.complaintRepository = complaintRepository;
    }

    @Scheduled(fixedRate = 3600000)
    @Transactional
    public void checkComplaintsForEscalation() {

        logger.info("Complaint escalation scheduler started.");

        List<Complaint> complaints = complaintRepository.findAll();

        LocalDateTime now = LocalDateTime.now();

        int escalatedCount = 0;

        for (Complaint complaint : complaints) {

            // Skip complaints that are already resolved.
            if ("RESOLVED".equalsIgnoreCase(complaint.getStatus())) {
                continue;
            }

            // Skip complaints that have already been escalated.
            if (complaint.getEscalatedAt() != null) {
                continue;
            }

            // Skip complaints without a creation timestamp.
            if (complaint.getCreatedAt() == null) {
                continue;
            }

            int escalationDays;

            switch (complaint.getSeverity().toUpperCase()) {
                case "LOW":
                    escalationDays = 5;
                    break;

                case "MEDIUM":
                    escalationDays = 3;
                    break;

                case "HIGH":
                    escalationDays = 2;
                    break;

                case "CRITICAL":
                    escalationDays = 1;
                    break;

                default:
                    logger.warn(
                            "Unknown severity for complaint ID {}",
                            complaint.getId());
                    continue;
            }

            long waitingHours = Duration.between(
                    complaint.getCreatedAt(), now).toHours();

            long requiredHours = escalationDays * 24L;

            if (waitingHours >= requiredHours) {

                complaint.setEscalatedAt(now);

                complaintRepository.save(complaint);

                escalatedCount++;

                logger.info(
                        "Complaint ID {} escalated. Severity: {}, Waiting hours: {}",
                        complaint.getId(),
                        complaint.getSeverity(),
                        waitingHours);
            }
        }

        logger.info(
                "Complaint escalation completed. Total escalated: {}",
                escalatedCount);
    }
}