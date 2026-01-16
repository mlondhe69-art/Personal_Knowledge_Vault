package personal_knowledge_vault.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import personal_knowledge_vault.DTO.LoginRequest;
import personal_knowledge_vault.DTO.SignUpRequest;
import personal_knowledge_vault.Entity.User;
import personal_knowledge_vault.Repository.UserRepository;
import personal_knowledge_vault.Util.JwtUtil;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil; // ✅ FIX 1

    // ================= REGISTER =================
    @PostMapping("/register")
    public void register(@RequestBody SignUpRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = User.builder()
                .email(request.getEmail())
                .username(request.getEmail()) // email used as username
                .password(passwordEncoder.encode(request.getPassword()))
                .provider("LOCAL")
                .build();

        userRepository.save(user);
    }

    // ================= LOGIN =================
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail()) // ✅ FIX 2
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        return Map.of("token", token);
    }
}
