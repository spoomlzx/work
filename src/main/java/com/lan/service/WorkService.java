package com.lan.service;

import com.lan.dao.RegulationMapper;
import com.lan.dao.WorkMapper;
import com.lan.model.Work;
import com.lan.model.WorkFull;
import com.lan.model.WorkSet;
import com.lan.util.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class WorkService {

    @Autowired
    private WorkMapper workMapper;
    @Autowired
    private RegulationMapper regulationMapper;

    public List<WorkSet> selectWorkSetList(Integer unitTypeId) {
        List<WorkSet> workSets = new ArrayList<>();
        String[] typelist = {"年度", "半年", "季度", "月度", "周", "日", "按需"};
        for (int i = 0; i < typelist.length; i++) {
            WorkSet workSet = new WorkSet();
            List<Work> works = workMapper.selectWorkList(unitTypeId, typelist[i]);
            if (works.size() > 0) {
                workSet.setWorkNum(works.size());
                workSet.setWorkType(typelist[i] + "工作");
                workSet.setWorkList(works);
                workSets.add(workSet);
            }
        }
        return workSets;
    }

    public WorkFull selectWork(Integer workId, Integer unitId, String type) {
        Date date = new Date();
        WorkFull work;
        switch (type) {
            case "年度":
            case "按需":
                work = workMapper.selectWork(workId, unitId, "y");
                break;
            case "半年":
                work=workMapper.selectWork(workId,unitId,"h"+ DateUtils.getHalfYear(date));
                break;
            case "季度":
                work=workMapper.selectWork(workId,unitId,"q"+ DateUtils.getSeason(date));
                break;
            case "月度":
                work=workMapper.selectWork(workId,unitId,"m"+ DateUtils.getMonth(date));
                break;
            case "周":
                work=workMapper.selectWork(workId,unitId,"w"+ DateUtils.getWeek(date));
                break;
            case "日":
                work=workMapper.selectWork(workId,unitId,"d"+ DateUtils.getDay(date));
                break;
            default:
                work = new WorkFull();
                break;
        }
        if (work.getRegulationIds() != null) {
            String[] ids = work.getRegulationIds().split(",");
            work.setRegulations(regulationMapper.selectRegualtionsByIds(ids));
        }
        return work;
    }

    public List<Integer> selectWorkIdsByKeyword(Integer unitTypeId, String keyword) {
        return workMapper.selectWorkIdsByKeyword(unitTypeId, keyword);
    }

    public int insert(Work pojo) {
        return workMapper.insert(pojo);
    }

    public int update(Work pojo) {
        return workMapper.update(pojo);
    }
}
