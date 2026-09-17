package com.example.backend;

import jakarta.persistence.*;

@Entity
@Table(name = "users") 
public class LoginDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username; 
    private String password; 

    // Constructors 
    public LoginDetails() {}
    // ... (rest of the constructors, getters, and setters are correct)
    
    // ...
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}