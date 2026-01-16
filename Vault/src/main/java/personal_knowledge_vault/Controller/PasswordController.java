package personal_knowledge_vault.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import personal_knowledge_vault.DTO.ForgotPasswordRequest;
import personal_knowledge_vault.DTO.ResetPasswordRequest;
import personal_knowledge_vault.Service.ForgotPasswordService;

@RestController
@RequestMapping("/api/auth")
public class PasswordController {

    private final ForgotPasswordService forgotPasswordService;

    public PasswordController(ForgotPasswordService forgotPasswordService) {
        this.forgotPasswordService = forgotPasswordService;
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        forgotPasswordService.sendResetLink(request.getEmail());
        return ResponseEntity.ok("Reset link sent to email ✅");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        forgotPasswordService.resetPassword(request.getToken(), request.getNewPassword());
        return ResponseEntity.ok("Password reset successful ✅");
    }
}
