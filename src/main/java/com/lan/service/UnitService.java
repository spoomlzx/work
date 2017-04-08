package com.lan.service;

import com.lan.dao.UnitMapper;
import com.lan.model.Unit;
import com.lan.model.UnitType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UnitService{

    @Autowired
    private UnitMapper unitMapper;

    public List<Unit> getUnitTreeById(Integer unitId){
        return unitMapper.getUnitTreeById(unitId);
    }

    public List<UnitType> getUnitTypeList(){
        return unitMapper.getUnitTypeList();
    }

    public int insert(Unit pojo){
        return unitMapper.insert(pojo);
    }

    public int insertSelective(Unit pojo){
        return unitMapper.insertSelective(pojo);
    }

    public int insertList(List<Unit> pojos){
        return unitMapper.insertList(pojos);
    }

    public int update(Unit pojo){
        return unitMapper.update(pojo);
    }

    @Transactional
    public void insertTypeWorkList(Integer unitTypeId,Integer[] workIds){
        try {
            unitMapper.insertTypeWorkList(unitTypeId,workIds);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Transactional
    public void deleteTypeWork(Integer unitTypeId,Integer workId){
        try {
            unitMapper.deleteTypeWork(unitTypeId, workId);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}
