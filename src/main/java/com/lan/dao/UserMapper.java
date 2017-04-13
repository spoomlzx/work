package com.lan.dao;

import com.lan.model.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserMapper {

    public User getUserByName(String userName);

    public List<User> getUserList(@Param("role") String role,@Param("unitId") Integer unitId);

    public int setPassword(@Param("password") String password,@Param("userId") Integer userId);

    public int insertSelective(@Param("user") User user);
}
