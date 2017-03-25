package com.lan.dao;

import com.lan.model.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserMapper {

    public User getUserByName(String userName);

}
