package com.vladhacksmile.springbackend.service;

import com.vladhacksmile.springbackend.jwt.JwtUtils;
import com.vladhacksmile.springbackend.models.User;
import com.vladhacksmile.springbackend.response.JwtResponse;
import com.vladhacksmile.springbackend.requests.LoginRequest;
import com.vladhacksmile.springbackend.utils.MessageResponse;
import com.vladhacksmile.springbackend.requests.SignupRequest;
import com.vladhacksmile.springbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class AuthService {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRespository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtUtils jwtUtils;

    public ResponseEntity<?> authUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        User userDetails = (User) authentication.getPrincipal();

        return ResponseEntity.ok(new JwtResponse(userDetails.getId(), jwt, userDetails.getUsername()));
    }

    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signupRequest) {
        if (userRespository.existsByUsername(signupRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Указанное имя занято!"));
        }

        User user = new User(signupRequest.getUsername(), passwordEncoder.encode(signupRequest.getPassword()));

        userRespository.save(user);
        return ResponseEntity.ok(new MessageResponse("Успешно!"));
    }
}
