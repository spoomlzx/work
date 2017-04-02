package com.lan.service;

import com.lan.dao.EventMapper;
import com.lan.model.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EventService{

    @Autowired
    private EventMapper eventMapper;

    public List<Event> getEvents(Integer unitId,String start,String end){
        return eventMapper.getEvents(unitId,start,end);
    }

    @Transactional
    public void insertSelective(Event pojo){
        try {
            eventMapper.insertSelective(pojo);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public int insertList(List<Event> pojos){
        return eventMapper.insertList(pojos);
    }

    public int update(Event pojo){
        return eventMapper.update(pojo);
    }

    @Transactional
    public void deleteEvent(Integer unitId,Integer id){
        try {
            eventMapper.deleteEvent(unitId,id);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}
