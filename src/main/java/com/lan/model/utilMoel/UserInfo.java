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
    private String[] typeArray={"航空兵","核潜艇","常规潜艇","水面舰艇","陆（特）战队","岸防","信息作战","训练机构","后装保障"};

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

    public String getTypeName(){
        return typeArray[user.getUnitTypeId()-1];
    }

}
