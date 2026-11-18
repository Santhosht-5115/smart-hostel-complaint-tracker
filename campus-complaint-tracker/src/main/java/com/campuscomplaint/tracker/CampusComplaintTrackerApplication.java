package com.campuscomplaint.tracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class CampusComplaintTrackerApplication {

    public static void main(String[] args) {
        SpringApplication.run(CampusComplaintTrackerApplication.class, args);
    }
}

