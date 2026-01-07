package com.ems.config;

import com.ems.entity.Employee;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    private Key SECRET_KEY;
    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 10; // 10 hours

    // ---------------- Signing Key ----------------
    private Key getSigningKey() {
        if (SECRET_KEY == null) {
            SECRET_KEY = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
        }
        return SECRET_KEY;
    }

    // ---------------- Generate Token ----------------
    public String generateToken(Employee employee) {
        return Jwts.builder()
                .setSubject(employee.getCompanyEmail())
                .claim("role", employee.getEmployeeRole().name())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigningKey())
                .compact();
    }

    // ---------------- ✅ FIXED validateToken ----------------
    public boolean validateToken(String token, UserDetails userDetails) {
        final String email = extractEmail(token);
        return email.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    // ---------------- Extract Email ----------------
    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // ---------------- Extract Role ----------------
    public String extractRole(String token) {
        return extractClaim(token, claims -> claims.get("role", String.class));
    }

    // ---------------- Helpers ----------------
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
