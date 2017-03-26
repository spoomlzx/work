package com.lan.service;

import com.lan.dao.WorkLogMapper;
import com.lan.model.WorkLog;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service
public class WorkLogService{

    @Resource
    private WorkLogMapper workLogMapper;

    public List<WorkLog> selectLogList(Integer workId,Integer unitId){
        return workLogMapper.selectLogList(workId,unitId);
    }

    public int insert(WorkLog pojo){
        return workLogMapper.insert(pojo);
    }

    @Transactional
    public void insertSelective(WorkLog pojo){
        try{
            workLogMapper.insertSelective(pojo);
        }catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public int insertList(List<WorkLog> pojos){
        return workLogMapper.insertList(pojos);
    }

    public int update(WorkLog pojo){
        return workLogMapper.update(pojo);
    }
}
