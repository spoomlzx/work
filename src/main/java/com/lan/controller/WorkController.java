package com.lan.controller;

import com.lan.model.WorkFull;
import com.lan.model.WorkLog;
import com.lan.model.WorkSet;
import com.lan.model.WorkStatus;
import com.lan.model.utilMoel.Message;
import com.lan.model.utilMoel.UserInfo;
import com.lan.service.RegulationService;
import com.lan.service.WorkLogService;
import com.lan.service.WorkService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * package com.zzc.controller
 *
 * @author spoomlzx
 * @date 2017/2/25
 */
@Controller
public class WorkController {
    private final static Logger logger= LoggerFactory.getLogger(WorkController.class);
    @Autowired
    private RegulationService regulationService;
    @Autowired
    private WorkService workService;
    @Autowired
    private WorkLogService workLogService;

    /**
     * 获取一条work的信息，返回给前端
     *
     * @param workId
     * @return work
     */
    @ResponseBody
    @RequestMapping(value = {"/getWork"}, method = RequestMethod.POST)
    public WorkFull getWork(@RequestParam(value = "workId") Integer workId,
                            @RequestParam(value = "unitId") Integer unitId, @ModelAttribute("currentUser") UserInfo userInfo) {
        WorkFull work;
        if ("ADMIN".equals(userInfo.getRole())) {
            //如果是ADMIN，则在工作详细页面不显示工作完成状态
            work = workService.selectWorkById(workId);
        } else {
            work = workService.selectWork(workId, unitId);
        }
        return work;
    }

    /**
     * 更新工作的完成状态
     * @param workId
     * @param check
     * @param userInfo
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/updateWorkStatus", method = RequestMethod.POST)
    public Message updateWorkStatus(@RequestParam(value = "workId") Integer workId,@RequestParam(value = "check") Boolean check,
                                    @ModelAttribute("currentUser") UserInfo userInfo) {
        Message message = new Message();
        try {
            Integer unitId=userInfo.getUnitId();
            workService.updateWorkStatus(workId, unitId, check);
            message.setCode(1);
            message.setData(!check);
            message.setMsg("修改工作状态成功！");
        } catch (RuntimeException e) {
            logger.error(e.getClass().getName() + ":" + e.getMessage());
            message.setCode(0);
            message.setData(check);
            message.setMsg("修改工作状态失败！");
        }
        return message;
    }

    /**
     * 获取worklist，按type分类
     *
     * @param unitTypeId
     * @return
     */
    @ResponseBody
    @RequestMapping(value = {"/getWorkList/{unitTypeId}"}, method = RequestMethod.GET)
    public List<WorkSet> getWorkList(@PathVariable Integer unitTypeId) {
        List<WorkSet> workSets = workService.selectWorkSetList(unitTypeId);
        return workSets;
    }

    @ResponseBody
    @RequestMapping(value = {"/getWorkStatusList/{unitId}"}, method = RequestMethod.GET)
    public Map<Integer, WorkStatus> getWorkListWithStatus(@PathVariable Integer unitId) {
        Map<Integer, WorkStatus> map = new HashMap<>();
        List<WorkStatus> workStatuses = workService.selectWorkListWithStatus(unitId);
        for (WorkStatus workStatus : workStatuses) {

            map.put(workStatus.getWorkId(),workStatus);
        }
        return map;
    }

    /**
     * 搜索work，得到work_id的list
     *
     * @param unitTypeId
     * @param keyword
     * @return
     */
    @ResponseBody
    @RequestMapping(value = {"/searchWork"}, method = RequestMethod.POST)
    public List<Integer> searchWork(@RequestParam(value = "unitTypeId") Integer unitTypeId, @RequestParam(value = "keyword", required = false) String keyword) {
        return workService.selectWorkIdsByKeyword(unitTypeId, keyword);
    }

    @ResponseBody
    @RequestMapping(value = "/addWorkLog", method = RequestMethod.POST)
    public Message addWorkLog(@RequestBody WorkLog workLog) {
        Message message = new Message();
        try {
            workLogService.insertSelective(workLog);
            message.setCode(1);
            message.setMsg("添加日志成功！");
        } catch (RuntimeException e) {
            logger.error(e.getClass().getName() + ":" + e.getMessage());
            message.setCode(0);
            message.setMsg("添加日志失败！");
        }
        return message;
    }

    @ResponseBody
    @RequestMapping(value = "/getWorkLogList/{workId}/{unitId}", method = RequestMethod.GET)
    public Map<Integer, WorkLog> getWorkLogList(@PathVariable Integer workId, @PathVariable Integer unitId) {
        Map<Integer, WorkLog> map = new HashMap<>();
        List<WorkLog> logs = workLogService.selectLogList(workId, unitId);
        for (WorkLog log : logs) {
            map.put(log.getLogId(),log);
        }
        return map;
    }
}
