package personal_knowledge_vault.security;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import personal_knowledge_vault.Entity.User;
import personal_knowledge_vault.Repository.UserRepository;
import personal_knowledge_vault.Util.JwtUtil;

@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException {

        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        OAuth2User oauthUser = oauthToken.getPrincipal();

        // ✅ Provider name: google / facebook
        String provider = oauthToken.getAuthorizedClientRegistrationId().toUpperCase();

        // ✅ Get email safely
        String email = oauthUser.getAttribute("email");

        if (email == null || email.isBlank()) {
            String msg = URLEncoder.encode(
                    "Email not found from " + provider + ". Cannot login.",
                    StandardCharsets.UTF_8
            );
            response.sendRedirect("http://localhost:5173/login?msg=" + msg);
            return;
        }

        // ✅ state passed from frontend:
        // REGISTER or LOGIN
        String flowState = request.getParameter("state");
        if (flowState == null) flowState = "LOGIN"; // default

        Optional<User> existingUserOpt = userRepository.findByEmail(email);
        boolean exists = existingUserOpt.isPresent();

        // ✅ REGISTER FLOW: If already exists -> go to login
        if ("REGISTER".equalsIgnoreCase(flowState) && exists) {
            String msg = URLEncoder.encode(
                    "Account already exists. Please login.",
                    StandardCharsets.UTF_8
            );
            response.sendRedirect("http://localhost:5173/login?msg=" + msg);
            return;
        }

        // ✅ LOGIN FLOW: If user not found -> go register
        if ("LOGIN".equalsIgnoreCase(flowState) && !exists) {
            String msg = URLEncoder.encode(
                    "Account not found. Please register first.",
                    StandardCharsets.UTF_8
            );
            response.sendRedirect("http://localhost:5173/register?msg=" + msg);
            return;
        }

        // ✅ If user does not exist (REGISTER case) -> create user
        if (!exists) {
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setUsername(email);
            newUser.setPassword(UUID.randomUUID().toString()); // dummy password
            newUser.setProvider(provider); // GOOGLE / FACEBOOK
            userRepository.save(newUser);
        }

        // ✅ Generate JWT
        String token = jwtUtil.generateToken(email);

        String encodedToken = URLEncoder.encode(token, StandardCharsets.UTF_8);

        response.sendRedirect(
            "http://localhost:5173/oauth-success?token=" + encodedToken
        );

    }
}
