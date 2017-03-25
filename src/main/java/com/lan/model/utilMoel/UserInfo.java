package com.lan.model.utilMoel;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

/**
 * package com.lan.security
 * extends User or implements UserDetails are both OK!
 * @author spoomlzx
 * @date 2016/8/24
 */
public class UserInfo extends User {
    private Integer unitId;
    private Integer unitTypeId;
    public UserInfo(Integer unitId,Integer unitTypeId,String username, String password, boolean enabled, boolean accountNonExpired, boolean credentialsNonExpired, boolean accountNonLocked, Collection<? extends GrantedAuthority> authorities) {
        super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
        this.unitId=unitId;
        this.unitTypeId=unitTypeId;
    }

    public Integer getUnitId() {
        return unitId;
    }

    public void setUnitId(Integer unitId) {
        this.unitId = unitId;
    }

    public Integer getUnitTypeId() {
        return unitTypeId;
    }

    public void setUnitTypeId(Integer unitTypeId) {
        this.unitTypeId = unitTypeId;
    }
}
