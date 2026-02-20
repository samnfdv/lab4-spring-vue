package ru.ifmo.backend.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.ifmo.backend.model.entity.User;
import ru.ifmo.backend.model.repository.UserRepository;

@Service
@Transactional
public class UserService {
    private final UserRepository userRepository;
    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public boolean isExistsByUsername(String name){
        return userRepository.existsByName(name);
    }

    @Transactional
    public void save(User user) {
        userRepository.save(user);
    }

    public User getCurrentUser() {
        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository
                .findByName(name)
                .orElseThrow(() -> new IllegalArgumentException("User with name = " + name + " not found"));
    }
}
