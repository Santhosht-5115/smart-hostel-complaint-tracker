package com.campuscomplaint.tracker.service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.campuscomplaint.tracker.dto.StaffAccountResponse;
import com.campuscomplaint.tracker.entity.Staff;
import com.campuscomplaint.tracker.entity.User;
import com.campuscomplaint.tracker.repository.StaffRepository;
import com.campuscomplaint.tracker.repository.UserRepository;

@Service
public class StaffAccountService {

    private final StaffRepository staffRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public StaffAccountService(
            StaffRepository staffRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.staffRepository = staffRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Get all staff members and their login account status
    @Transactional(readOnly = true)
    public List<StaffAccountResponse> getAllStaffAccounts() {

        List<Staff> staffList = staffRepository.findAll();

        Set<String> accountEmails = userRepository.findAll()
                .stream()
                .filter(user -> "STAFF".equals(user.getRole()))
                .map(User::getEmail)
                .collect(Collectors.toSet());

        return staffList.stream()
                .map(staff -> new StaffAccountResponse(
                        staff.getId(),
                        staff.getName(),
                        staff.getEmail(),
                        staff.getCategory(),
                        staff.isActive(),
                        accountEmails.contains(staff.getEmail())
                ))
                .collect(Collectors.toList());
    }

    // Create a staff login account
    @Transactional
    public String createStaffAccount(String email, String password) {

        Staff staff = staffRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Staff member not found"));

        if (!staff.isActive()) {
            throw new IllegalArgumentException(
                    "This staff member is inactive");
        }

        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException(
                    "An account already exists for this email");
        }

        User user = new User();

        user.setName(staff.getName());
        user.setEmail(staff.getEmail());
        user.setPassword(passwordEncoder.encode(password));
        user.setRole("STAFF");

        userRepository.save(user);

        return "Staff account created successfully";
    }
}