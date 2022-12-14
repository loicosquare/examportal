package com.exam.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "roles")
public class Role {

    @Id
    private Long roleId;
    private String roleName;

    @OneToMany(
            cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "role"
    )
    private Set<UserRole> userRoles =  new HashSet<>();
}
