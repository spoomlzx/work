package com.lan.service;

import com.lan.dao.WorkHistoryMapper;
import com.lan.model.WorkHistory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkHistoryService{

    @Autowired
    private WorkHistoryMapper workHistoryMapper;

    public List<WorkHistory> getWorkHistoryByUnitId(Integer unitId){
        return workHistoryMapper.getWorkHistoryByUnitId(unitId);
    }

    public int insert(WorkHistory pojo){
        return workHistoryMapper.insert(pojo);
    }

    public int update(WorkHistory pojo){
        return workHistoryMapper.update(pojo);
    }
}
