package com.lan.service;

import com.lan.dao.EventMapper;
import com.lan.model.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService{

    @Autowired
    private EventMapper eventMapper;

    public List<Event> getEvents(Integer unitId,String start,String end){
        return eventMapper.getEvents(unitId,start,end);
    }

    public int insert(Event pojo){
        return eventMapper.insert(pojo);
    }

    public int insertSelective(Event pojo){
        return eventMapper.insertSelective(pojo);
    }

    public int insertList(List<Event> pojos){
        return eventMapper.insertList(pojos);
    }

    public int update(Event pojo){
        return eventMapper.update(pojo);
    }
}
