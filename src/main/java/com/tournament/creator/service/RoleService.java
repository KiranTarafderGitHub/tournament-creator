package com.tournament.creator.service;

import java.util.List;

import com.tournament.creator.profile.dto.Role;

public interface RoleService {

    List<Role> getRoles();

    Role getRoleById(final Long roleId);

    Role getRoleByName(final String roleName);

    Role addRole(Role role);

    Role updateRoleById(final Long id, final Role role);

    Role updateRoleByName(final String name, final Role role);

    void deleteRoleById(final Long roleId);

    void deleteRoleByName(final String name);
}
