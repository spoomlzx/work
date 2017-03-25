package com.lan.service;

import com.lan.dao.RegulationMapper;
import com.lan.model.Regulation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RegulationService{

    @Autowired
    private RegulationMapper regulationMapper;

    public Regulation selectRegulationById(Integer reguId){
        return regulationMapper.selectRegulationById(reguId);
    }

    public List<Regulation> selectRegulationList(){
        return regulationMapper.selectRegulationList();
    }

    public List<Regulation> selectRegualtionsByIds(String[] ids){
        return regulationMapper.selectRegualtionsByIds(ids);
    }

    @Transactional
    public void insert(Regulation pojo){
        try {
            regulationMapper.insertSelective(pojo);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public int insertSelective(Regulation pojo){
        return regulationMapper.insertSelective(pojo);
    }

    public int insertList(List<Regulation> pojos){
        return regulationMapper.insertList(pojos);
    }

    @Transactional
    public void update(Regulation pojo){
        try {
            regulationMapper.update(pojo);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Transactional
    public void deleteByReguId(Integer reguId){
        try {
            // TODO: 2017/3/13 删除regulation时同步删除work中的引用
            regulationMapper.deleteByReguId(reguId);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}
