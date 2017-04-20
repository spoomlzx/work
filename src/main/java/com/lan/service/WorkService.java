package com.lan.service;

import com.lan.dao.RegulationMapper;
import com.lan.dao.WorkMapper;
import com.lan.model.Work;
import com.lan.model.WorkFull;
import com.lan.model.WorkSet;
import com.lan.model.WorkStatus;
import com.lan.util.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class WorkService {

    @Autowired
    private WorkMapper workMapper;
    @Autowired
    private RegulationMapper regulationMapper;

    public List<Work> getWorkList(){
        return workMapper.getWorkList();
    }

    public List<WorkSet> selectWorkSetList(Integer unitTypeId) {
        List<WorkSet> workSets = new ArrayList<>();
        String[] typelist = {"年度", "半年", "季度", "月度", "周", "日", "按需"};
        for (int i = 0; i < typelist.length; i++) {
            WorkSet workSet = new WorkSet();
            List<WorkStatus> works = workMapper.selectWorkList(unitTypeId, typelist[i]);
            if (works.size() > 0) {
                workSet.setWorkNum(works.size());
                workSet.setWorkType(typelist[i] + "工作");
                workSet.setWorkList(works);
                workSets.add(workSet);
            }
        }
        return workSets;
    }

    public Map<String,List<WorkFull>> selectWorkSetListByUnitId(Integer unitId) {
        String[] typelist = {"年度", "半年", "季度", "月度", "周", "日", "按需"};
        Map<String,List<WorkFull>> map=new LinkedHashMap<>();
        for (int i = 0; i < typelist.length; i++) {
            List<WorkFull> works = workMapper.selectWorkListByUnitId(unitId, getIndex(typelist[i]),typelist[i]);
            map.put(typelist[i],works);
        }
        return map;
    }

    public WorkFull selectWorkById(Integer workId) {
        WorkFull work = workMapper.selectWorkById(workId);
        if (work.getRegulationIds() != null) {
            String[] ids = work.getRegulationIds().split(",");
            work.setRegulations(regulationMapper.selectRegualtionsByIds(ids));
        }
        return work;
    }

    public WorkFull selectWork(Integer workId, Integer unitId) {
        String type = workMapper.getTypeById(workId);
        WorkFull work = workMapper.selectWork(workId, unitId, getIndex(type));
        if (work.getRegulationIds() != null) {
            String[] ids = work.getRegulationIds().split(",");
            work.setRegulations(regulationMapper.selectRegualtionsByIds(ids));
        }
        return work;
    }

    public List<WorkStatus> selectWorkListWithStatus(Integer unitId){
        String index="$.year"+DateUtils.getYear(new Date());
        return workMapper.getWorkListWithStatus(unitId,index);
    }

    @Transactional
    public int updateWorkStatus(Integer workId, Integer unitId, Boolean check) {
        int i = -1;
        String type = workMapper.getTypeById(workId);
        try {
            if (check) {
                i = workMapper.deleteWorkRecord(workId, unitId, getIndex(type));
            } else {
                i = workMapper.insertWorkRecord(workId, unitId, getIndex(type));
            }
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
        return i;
    }

    public List<Integer> selectWorkIdsByKeyword(Integer unitTypeId, String keyword) {
        return workMapper.selectWorkIdsByKeyword(unitTypeId, keyword);
    }


    public List<Work> getWorkListInTypeWork(Integer unitTypeId,String type){
        return workMapper.getWorkListInTypeWork(unitTypeId,type);
    }

    public List<Work> getWorkListNotInTypeWork(Integer unitTypeId,String type){
        return workMapper.getWorkListNotInTypeWork(unitTypeId,type);
    }


    @Transactional
    public int insert(Work pojo) {
        try{
            return workMapper.insertSelective(pojo);
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    @Transactional
    public int update(Work pojo) {
        try {
            return workMapper.update(pojo);
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }


    private String getIndex(String type) {
        Date date = new Date();
        String index = "$.year" + DateUtils.getYear(date) + ".u";
        switch (type) {
            case "年度":
            case "按需":
                index = index + 1;
                break;
            case "半年":
                index = index + DateUtils.getHalfYear(date);
                break;
            case "季度":
                index = index + DateUtils.getSeason(date);
                break;
            case "月度":
                index = index + DateUtils.getMonth(date);
                break;
            case "周":
                index = index + DateUtils.getWeek(date);
                break;
            case "日":
                index = index + DateUtils.getDay(date);
                break;
        }
        return index;
    }
}
