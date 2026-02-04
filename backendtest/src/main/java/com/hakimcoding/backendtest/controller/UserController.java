package com.hakimcoding.backendtest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hakimcoding.backendtest.exception.UserNotFoundException;
import com.hakimcoding.backendtest.model.*;

import com.hakimcoding.backendtest.repository.UserRepository;
import com.hakimcoding.backendtest.service.UserService;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @PostMapping("/user")
    User newUser(@RequestBody User newUser){
        return userRepository.save(newUser);
    }

    @GetMapping("/users")
    List<User> getAllUsers(){
        return userRepository.findAll();
    }

    @GetMapping("/user/{id}")
    User getUserById(@PathVariable Long id){
        return userRepository.findById(id)
                .orElseThrow(()->new UserNotFoundException(id));   
    }

    @PutMapping("/user/{id}")
    User updateUser(@RequestBody User newUser, @PathVariable Long id){
        return userRepository.findById(id)
                    .map(user ->{
                        user.setName(newUser.getName());
                        user.setUsername(newUser.getUsername());
                        user.setEmail(newUser.getEmail());
                        return userRepository.save(user);
                    }
                    ).orElseThrow(()->new UserNotFoundException(id));
                    
    }

    @DeleteMapping("/user/{id}")
    String deleteUser(@PathVariable Long id){
        if (!userRepository.existsById(id)){
            throw new UserNotFoundException(id);
        }
       userRepository.deleteById(id);
       return "The account with id: " + id + "have been deleted.";
    }

    @GetMapping("/users/search")
    List<User> searchByName(@RequestParam String name) {
        return userRepository.findByNameContainingIgnoreCase(name);
    }

    @PostMapping("/register")
    User register(@RequestBody User user){
        return userService.register(user);
    }
    
}
