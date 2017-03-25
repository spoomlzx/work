package com.lan.service;

import com.lan.dao.UserMapper;
import com.lan.model.User;
import com.lan.model.utilMoel.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * package com.lan.security
 *
 * @author spoomlzx
 * @date 2016/8/24
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private UserInfo userInfo;

    @Autowired
    private UserMapper userMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user=userMapper.getUserByName(username);
        if(user!=null){
            System.out.println("user: "+user.getUserName()+" had being found");
            List<GrantedAuthority> authorities = AuthorityUtils.commaSeparatedStringToAuthorityList(user.getRoles());
            userInfo = new UserInfo(user.getUnitId(),user.getUnitTypeId(),username,user.getPassword(),true,true,true,true,authorities);
        }
        return userInfo;
    }
}
