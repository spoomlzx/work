package com.lan.controller;

import com.lan.model.Event;
import com.lan.model.Unit;
import com.lan.model.utilMoel.Message;
import com.lan.model.utilMoel.UserInfo;
import com.lan.service.EventService;
import com.lan.service.UnitService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * package com.zzc.controller
 *
 * @author spoomlzx
 * @date 2017/3/13
 */
@Controller
public class UnitController {
    private final static Logger logger= LoggerFactory.getLogger(UnitController.class);
    @Autowired
    private UnitService unitService;
    @Autowired
    private EventService eventService;

    /**
     * 返回单位树的json
     *
     * @param unitId
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/getUnitTree/{unitId}", method = RequestMethod.GET)
    public List<Unit> getUnitTree(@PathVariable Integer unitId) {
        List<Unit> units = unitService.getUnitTreeById(unitId);
        return units;
    }

    @ResponseBody
    @RequestMapping(value = "/getEvents", method = RequestMethod.POST)
    public List<Event> getEvents(@RequestParam(value = "start") String start,
                                 @RequestParam(value = "end") String end,
                                 @ModelAttribute("currentUser") UserInfo userInfo) {
        List<Event> events = eventService.getEvents(userInfo.getUnitId(), start, end);
        return events;
    }

    @ResponseBody
    @RequestMapping(value = "/addEvent",method = RequestMethod.POST)
    public Message addEvent(@RequestBody Event event,@ModelAttribute("currentUser") UserInfo userInfo){
        Message message = new Message();
        try{
            event.setUnitId(userInfo.getUnitId());
            eventService.insertSelective(event);
            message.setData(event);
            message.setMsg("添加工作成功！");
        }catch(RuntimeException e){
            logger.error(e.getClass().getName() + ":" + e.getMessage());
            message.setCode(0);
            message.setMsg("添加工作失败！");
        }
        return message;
    }

    @ResponseBody
    @RequestMapping(value = "/deleteEvent/{id}",method = RequestMethod.GET)
    public Message deleteEvent(@PathVariable Integer id,@ModelAttribute("currentUser") UserInfo userInfo){
        Message message = new Message();
        try{
            eventService.deleteEvent(userInfo.getUnitId(),id);
            message.setMsg("删除工作成功！");
        }catch(RuntimeException e){
            logger.error(e.getClass().getName() + ":" + e.getMessage());
            message.setCode(0);
            message.setMsg("删除工作失败！");
        }
        return message;
    }

}
