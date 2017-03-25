package com.lan.model.utilMoel;

import com.lan.model.User;
import org.springframework.security.core.authority.AuthorityUtils;

/**
 * package com.lan.security
 * extends User or implements UserDetails are both OK!
 * @author spoomlzx
 * @date 2016/8/24
 */
public class UserInfo extends org.springframework.security.core.userdetails.User {
    private com.lan.model.User user;

    public UserInfo(User user){
        super(user.getUserName(), user.getPassword(),true,true,true,true, AuthorityUtils.commaSeparatedStringToAuthorityList(user.getRoles()));
        this.user=user;
    }

    public Integer getUnitId() {
        return user.getUnitId();
    }

    public Integer getUnitTypeId() {
        return user.getUnitTypeId();
    }

    public String getRole(){
        return user.getRoles();
    }

}
