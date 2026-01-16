package personal_knowledge_vault.Controller;

import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import personal_knowledge_vault.Entity.User;
import personal_knowledge_vault.Repository.UserRepository;

@RestController
@RequestMapping("/api/user")
public class UserProfileController {

    private final UserRepository userRepository;

    public UserProfileController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/me")
    public Map<String, Object> me(Authentication auth) {

        String email = auth.getName(); // ✅ from JWT

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return Map.of(
                "name", user.getUsername(),  // you can store real name later
                "email", user.getEmail(),
                "provider", user.getProvider(),
                "createdAt", user.getCreatedAt()
        );
    }
}
