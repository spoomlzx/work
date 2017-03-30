package com.lan;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.lan.dao.UserMapper;
import com.lan.model.User;
import com.lan.model.utilMoel.UserInfo;
import com.lan.service.UserDetailsServiceImpl;
import com.lan.service.WorkService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.Map;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class WorkApplicationTests {

	@Test
	public void contextLoads() {
	}

	@Autowired
	private UserMapper userMapper;
	@Autowired
	private WorkService workService;

	@Autowired
	private UserDetailsServiceImpl userDetailsService;

	@Test
	public void test(){
		Gson gson=new Gson();
		User user=userMapper.getUserByName("lan");
		UserInfo userInfo= (UserInfo) userDetailsService.loadUserByUsername("lan");
		System.out.println(gson.toJson(userInfo));
	}

	@Test
	public void encoder(){
		BCryptPasswordEncoder encoder=new BCryptPasswordEncoder();
		System.out.println(encoder.encode("asdf"));
	}

	@Test
	public void testSelectWork(){
		Gson gson=new Gson();
		String a="{\"u1\": 1, \"u2\": 1, \"u3\": 1, \"u5\": 1}";
		Map<String,Integer> m=gson.fromJson(a,new TypeToken<Map<String, Integer>>() { }.getType());
		//System.out.println(m);

		System.out.println(gson.toJson(workService.selectWorkListWithStatus(1)));
	}
}
