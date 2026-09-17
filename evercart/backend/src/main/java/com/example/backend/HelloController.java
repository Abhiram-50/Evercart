package com.example.backend;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    private final LoginRepo loginRepo;

    // Constructor
    public HelloController(LoginRepo loginRepo) {
        this.loginRepo = loginRepo;
    }

    // --- READ OPERATIONS ---

    @GetMapping("/get")
    public List<LoginDetails> getDetails() {
        return fetchAllUsers();
    }

    private List<LoginDetails> fetchAllUsers() {
        return loginRepo.findAll();
    }

    // NOTE: @GetMapping("/api/auth/me") IS REMOVED HERE
    // NOTE: @PostMapping("/login") IS REMOVED HERE

    // --- DELETE OPERATIONS ---

    @DeleteMapping("/delete/id/{myid}")
    public ResponseEntity<String> deleteById(@PathVariable Long myid) {
        deleteUserById(myid);
        return ResponseEntity.ok("User with id " + myid + " deleted successfully.");
    }

    @DeleteMapping("/delete/username/{username}")
    public ResponseEntity<String> deleteByUsername(@PathVariable String username) {
        deleteUserByName(username);
        return ResponseEntity.ok("User with username " + username + " deleted successfully.");
    }

    @Transactional
    private void deleteUserByName(String username) {
        boolean exists = loginRepo.existsByUsername(username);
        if (!exists) {
            throw new IllegalStateException("User with username " + username + " does not exist");
        }
        loginRepo.deleteByUsername(username);
    }

    @Transactional
    private void deleteUserById(Long studentId) {
        boolean exists = loginRepo.existsById(studentId);
        if (!exists) {
            throw new IllegalStateException("Student with id " + studentId + " does not exist");
        }
        loginRepo.deleteById(studentId);
    }
}
