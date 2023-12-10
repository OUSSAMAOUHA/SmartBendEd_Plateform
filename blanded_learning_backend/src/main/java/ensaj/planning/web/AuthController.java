package ensaj.planning.web;

import ensaj.planning.entities.AuthRequest;
import ensaj.planning.entities.AuthRespense;
import ensaj.planning.services.IAuth;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@CrossOrigin("*")
@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

    private final IAuth auth;

    @PostMapping("/login")
    public AuthRespense login(@RequestBody AuthRequest authRequest) {
        log.info("AuthController.login()...");
        return auth.login(authRequest.getUsername(), authRequest.getPassword());
    }
    @GetMapping("/logout/{id}")
    public void logout( @PathVariable Long id) {
        log.info("AuthController.logout()...");
        auth.logout(id);
    }
}
