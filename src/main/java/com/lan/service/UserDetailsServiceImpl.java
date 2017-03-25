package com.lan.service;

import com.lan.dao.UserMapper;
import com.lan.model.User;
import com.lan.model.utilMoel.UserInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


/**
 * package com.lan.security
 *
 * @author spoomlzx
 * @date 2016/8/24
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private static final Logger LOGGER= LoggerFactory.getLogger(UserDetailsServiceImpl.class);

    private UserInfo userInfo;

    @Autowired
    private UserMapper userMapper;

    @Override
    public UserInfo loadUserByUsername(String username) throws UsernameNotFoundException {
        User user=userMapper.getUserByName(username);
        if(user!=null){
            LOGGER.info("user: "+user.getUserName()+" had being found");
            userInfo = new UserInfo(user);
        }
        return userInfo;
    }
}
