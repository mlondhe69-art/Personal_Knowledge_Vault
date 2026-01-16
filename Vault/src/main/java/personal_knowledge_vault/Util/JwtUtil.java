package personal_knowledge_vault.Util;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Service
public class JwtUtil {

    //private final String SECRET_KEY = "viratkohli_viratkohli_viratkohli_123456";
	//private final Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
	
    	@Value("${jwt.secret}")
    	public String SECRET_KEY;

    	private Key key;
    	
    	@PostConstruct
    	public void init() {
    		this.key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    	}
    	
    	 private SecretKey getSigningKey() {
    	        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    	    }
    	 
    	 

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> resolver) {
        return resolver.apply(extractAllClaims(token));
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public String generateToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, username);
    }

    private String createToken(Map<String, Object> claims, String subject) {
    	
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(key)
                .compact();
    }
    
    public Boolean validateToken(String token) {
        return !isTokenExpired(token);
    }

}

