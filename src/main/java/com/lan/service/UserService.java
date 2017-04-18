package com.lan.service;

import com.lan.dao.UserMapper;
import com.lan.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * package com.lan.service
 *
 * @author spoomlzx
 * @date 2017/4/13
 */
@Service
public class UserService {
    private final static Logger logger= LoggerFactory.getLogger(UserService.class);
    @Autowired
    private UserMapper userMapper;

    public List<User> getUserList(String role, Integer unitId){
        return userMapper.getUserList(role,unitId);
    }

    @Transactional
    public void setPassword(String password,Integer userId){
        try {
            userMapper.setPassword(password, userId);
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    @Transactional
    public void changeEnable(Integer userId){
        try {
            userMapper.changeEnable(userId);
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    public User getUserByName(String username){
        return userMapper.getUserByName(username);
    }

    @Transactional
    public void regUser(User user){
        try {
            userMapper.insertSelective(user);
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }
}
