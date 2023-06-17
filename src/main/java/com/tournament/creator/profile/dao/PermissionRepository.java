package com.tournament.creator.profile.dao;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tournament.creator.profile.entity.PermissionEntity;

public interface PermissionRepository extends JpaRepository<PermissionEntity, Long> {

    PermissionEntity findByName(final String name);

    List<PermissionEntity> findByInternalIsFalse();

    PermissionEntity findByIdAndInternalIsFalse(final Long id);

    PermissionEntity findByNameAndInternalIsFalse(final String name);
}
