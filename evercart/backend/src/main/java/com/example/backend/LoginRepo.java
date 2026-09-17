package com.example.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional; // Keep this import for the transactional delete

import java.util.Optional;

@Repository
public interface LoginRepo extends JpaRepository<LoginDetails, Long> {
    
    Optional<LoginDetails> findByUsername(String username);

    boolean existsByUsername(String username); 

    @Transactional // REQUIRED for derived delete methods
    void deleteByUsername(String username);
}