package ru.ifmo.backend.controller.common;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ru.ifmo.backend.model.entity.User;
import ru.ifmo.backend.model.entity.dto.JwtResponse;
import ru.ifmo.backend.model.entity.dto.LoginRequest;
import ru.ifmo.backend.model.security.JwtUtils;
import ru.ifmo.backend.model.service.UserService;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class CommonController {

    private BCryptPasswordEncoder encoder;
    private AuthenticationManager authManager;
    private UserService userService;
    private  JwtUtils jwtUtils;

    @Autowired
    public CommonController(BCryptPasswordEncoder encoder,
                            AuthenticationManager authManager,
                            UserService userService,
                            JwtUtils jwtUtils) {
        this.encoder = encoder;
        this.authManager = authManager;
        this.userService = userService;
        this.jwtUtils = jwtUtils;

    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateToken(loginRequest.getUsername());

        return ResponseEntity.ok(new JwtResponse(jwt));
    }



    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody LoginRequest regRequest) {
        if (userService.isExistsByUsername(regRequest.getUsername())) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }
        User user = new User(regRequest.getUsername(), encoder.encode(regRequest.getPassword()));
        userService.save(user);
        return ResponseEntity.ok("User registered successfully!");
    }



}
