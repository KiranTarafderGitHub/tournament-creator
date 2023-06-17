package com.tournament.creator.service;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.tournament.creator.profile.dto.User;

public interface UserService extends UserDetailsService
{
    List<User> getUsers();

    List<User> getAdminPortalUsers();

    User getUserById(final Long userId);

    User getUserByUsername(final String username);

    User addUser(User user);

    User updateUserById(Long id, User user);

    User updateUserByUsername(String username, User user);

    void updateProfile(final User user);

    void deleteUserById(Long id);

    void deleteUserByUsername(String username);
    
    

}
