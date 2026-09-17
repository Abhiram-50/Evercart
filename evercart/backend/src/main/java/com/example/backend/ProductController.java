package com.example.backend;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/api/products")
    public List<Map<String, Object>> getProducts() {
        try {
            List<Map<String, Object>> remoteProducts = restTemplate.getForObject(
                "https://fakestoreapi.com/products?limit=40",
                List.class
            );

            if (remoteProducts == null || remoteProducts.isEmpty()) {
                return Collections.emptyList();
            }

            return remoteProducts.stream()
                .limit(40)
                .map(this::mapProduct)
                .collect(Collectors.toList());
        } catch (Exception ex) {
            return Collections.emptyList();
        }
    }

    private Map<String, Object> mapProduct(Map<String, Object> item) {
        Map<String, Object> rating = (Map<String, Object>) item.get("rating");
        return Map.of(
            "id", item.get("id"),
            "name", item.getOrDefault("title", item.getOrDefault("name", "Product")),
            "price", ((Number) item.get("price")).doubleValue() * 83,
            "img", item.getOrDefault("image", item.getOrDefault("img", "")),
            "category", item.getOrDefault("category", "Electronics"),
            "badge", rating != null && ((Number) rating.get("rate")).doubleValue() >= 4 ? "Top Rated" : "Trending",
            "rating", rating != null ? rating.get("rate") : "4.5",
            "description", item.getOrDefault("description", "Premium product from the live catalog.")
        );
    }
}
