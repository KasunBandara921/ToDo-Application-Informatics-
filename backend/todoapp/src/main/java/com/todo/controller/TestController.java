package com.todo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/test")
public class TestController {
    
    @GetMapping("/protected")
    public ResponseEntity<Map<String, String>> protectedEndpoint(
            Authentication authentication) {
        String username = authentication.getName();
        return ResponseEntity.ok(Map.of(
            "message", "You are authenticated!",
            "username", username
        ));
    }
}