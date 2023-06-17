package com.tournament.creator.profile.dao;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tournament.creator.profile.entity.RoleEntity;

public interface RoleRepository extends JpaRepository<RoleEntity, Long> {

    RoleEntity findByName(final String name);

    void deleteByName(final String name);

    List<RoleEntity> findByInternalIsFalse();

    RoleEntity findByIdAndInternalIsFalse(final Long id);

    RoleEntity findByNameAndInternalIsFalse(final String roleName);
}
