package ensaj.planning.entities;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class AuthRequest {
    private String username;
    private String password;
}
