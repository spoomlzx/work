package com.lan.service;

import com.lan.dao.UnitMapper;
import com.lan.model.Unit;
import com.lan.model.UnitType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UnitService{
    private final static Logger logger= LoggerFactory.getLogger(UnitService.class);

    @Autowired
    private UnitMapper unitMapper;

    public List<Unit> getUnitTreeById(Integer unitId){
        return unitMapper.getUnitTreeById(unitId);
    }

    public List<UnitType> getUnitTypeList(){
        return unitMapper.getUnitTypeList();
    }

    @Transactional
    public int insert(Unit pojo){
        try {
            return unitMapper.insertSelective(pojo);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Transactional
    public void update(Unit pojo){
        try {
            unitMapper.update(pojo);
        } catch (Exception e) {
            logger.error(e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }

    @Transactional
    public void delete(Integer unitId){
        try {
            unitMapper.delete(unitId);
        } catch (Exception e) {
            logger.error(e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
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
