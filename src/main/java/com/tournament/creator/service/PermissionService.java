package com.tournament.creator.service;

import java.util.List;

import com.tournament.creator.profile.dto.Permission;

public interface PermissionService {

    Permission getPermissionById(Long id);

    Permission getPermissionByName(String name);

    List<Permission> getPermissions();

    Permission addPermission(Permission permission);

}
