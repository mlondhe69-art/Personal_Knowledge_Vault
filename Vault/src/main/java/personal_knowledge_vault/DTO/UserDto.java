package personal_knowledge_vault.DTO;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {
    private String name;
    private String email;
    private String provider;
    private LocalDateTime createdAt;
}
