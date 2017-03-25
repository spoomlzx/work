package com.lan.controller;

import com.lan.model.WorkFull;
import com.lan.model.WorkHistory;
import com.lan.model.WorkSet;
import com.lan.service.RegulationService;
import com.lan.service.WorkHistoryService;
import com.lan.service.WorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * package com.zzc.controller
 *
 * @author spoomlzx
 * @date 2017/2/25
 */
@Controller
public class WorkController {
    @Autowired
    private RegulationService regulationService;
    @Autowired
    private WorkService workService;
    @Autowired
    private WorkHistoryService workHistoryService;

    /**
     * 获取一条work的信息，返回给前端
     *
     * @param workId
     * @return work
     */
    @ResponseBody
    @RequestMapping(value = {"/getWork"}, method = RequestMethod.POST)
    public WorkFull getWork(@RequestParam(value = "workId") Integer workId, @RequestParam(value = "unitId") Integer unitId, @RequestParam(value = "type") String type) {
        WorkFull work = workService.selectWork(workId,unitId,type);
        return work;
    }

    @ResponseBody
    @RequestMapping(value = {"/getWorkList/{unitTypeId}"}, method = RequestMethod.GET)
    public List<WorkSet> getWorkList(@PathVariable Integer unitTypeId) {
        List<WorkSet> workSets = workService.selectWorkSetList(unitTypeId);
        return workSets;
    }

    @ResponseBody
    @RequestMapping(value = {"/searchWork"}, method = RequestMethod.POST)
    public List<Integer> searchWork(@RequestParam(value = "unitTypeId") Integer unitTypeId, @RequestParam(value = "keyword", required = false) String keyword) {
        return workService.selectWorkIdsByKeyword(unitTypeId, keyword);
    }

    /**
     * 返回unitId对应的所有工作的list
     *
     * @param unitId
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/getWorkHistory/{unitId}", method = RequestMethod.GET)
    public List<WorkHistory> getWorkHistoryByUnitId(@PathVariable Integer unitId) {
        return workHistoryService.getWorkHistoryByUnitId(unitId);
    }
}
