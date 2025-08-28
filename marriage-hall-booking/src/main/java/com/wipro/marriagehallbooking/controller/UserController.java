package com.wipro.marriagehallbooking.controller;

import com.wipro.marriagehallbooking.entity.User;
import com.wipro.marriagehallbooking.service.UserService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // ✅ POST -> /api/users
    @PostMapping
    public User createUser(@RequestBody @jakarta.validation.Valid User user) {
        return userService.createUser(user);
    }

    // ✅ GET -> /api/users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // ✅ GET -> /api/users/{id}
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // ✅ PUT -> /api/users/{id}
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
    	
    	return userService.updateUser(id, user);
    }

    // ✅ DELETE -> /api/users/{id}
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
