package com.example.backend;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // Allows React to connect
public class AuthController {

    private final LoginRepo loginRepo;

    public AuthController(LoginRepo loginRepo) {
        this.loginRepo = loginRepo;
    }

    // POST /api/auth/register
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody LoginDetails newUser) {
        if (loginRepo.existsByUsername(newUser.getUsername())) {
            return new ResponseEntity<>("Username is already taken!", HttpStatus.CONFLICT);
        }
        loginRepo.save(newUser);
        return new ResponseEntity<>("User registered successfully!", HttpStatus.CREATED);
    }

    // POST /api/auth/login
    @PostMapping("/login")
    public ResponseEntity<String> authenticateUser(@RequestBody LoginDetails loginUser) {
        Optional<LoginDetails> userOptional = loginRepo.findByUsername(loginUser.getUsername());

        if (userOptional.isPresent() && 
            userOptional.get().getPassword().equals(loginUser.getPassword())) {
            
            // Success
            return new ResponseEntity<>("Login successful!", HttpStatus.OK);
        }
        
        // Failure
        return new ResponseEntity<>("Invalid username or password.", HttpStatus.UNAUTHORIZED);
    }
}