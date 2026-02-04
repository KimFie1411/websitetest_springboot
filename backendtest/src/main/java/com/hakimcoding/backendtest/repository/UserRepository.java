package com.hakimcoding.backendtest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hakimcoding.backendtest.model.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>{
    List<User> findByNameContainingIgnoreCase(String name);

    Optional<User> findByUsername(String username);
}
