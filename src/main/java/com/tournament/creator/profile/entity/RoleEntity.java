package com.tournament.creator.profile.entity;

import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.security.core.GrantedAuthority;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "role")
public class RoleEntity implements GrantedAuthority {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;

	private String description;

	private boolean internal;

	@ManyToMany
	@JoinTable(
			name="role_permission",
			joinColumns = {@JoinColumn(name="role_id", referencedColumnName = "id")},
			inverseJoinColumns = {@JoinColumn(name="permission_id", referencedColumnName = "id")}
	)
	@LazyCollection(LazyCollectionOption.FALSE)
	private Set<PermissionEntity> permissions;

	public RoleEntity() {
	}

	public RoleEntity(String name) {
		this.name = name;
	}

	public RoleEntity(String name, String description) {
		this.name = name;
		this.description = description;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}


	public Set<PermissionEntity> getPermissions() {
		return permissions;
	}

	public void addPermission(PermissionEntity permissionEntity) {
		if(permissions == null) {
			permissions = new HashSet<>();
		}
		permissions.add(permissionEntity);
	}

	public void setPermissions(Set<PermissionEntity> permissions) {
		this.permissions = permissions;
	}

	public boolean getInternal() {
		return internal;
	}

	public void setInternal(boolean internal) {
		this.internal = internal;
	}

	@Override
	public String getAuthority() {
		return getName();
	}

	@Override
	public String toString() {
		return "RoleEntity{" +
				"id=" + id +
				", name='" + name + '\'' +
				", description='" + description + '\'' +
				'}';
	}


}
