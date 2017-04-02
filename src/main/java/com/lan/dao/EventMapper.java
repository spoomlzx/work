package com.lan.dao;

import com.lan.model.Event;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventMapper {

    List<Event> getEvents(@Param("unitId") Integer unitId,@Param("start") String start,@Param("end") String end);

    int insertSelective(@Param("pojo") Event pojo);

    int insertList(@Param("pojos") List<Event> pojo);

    int update(@Param("pojo") Event pojo);

    int deleteEvent(@Param("unitId") Integer unitId,@Param("id") Integer id);
}
