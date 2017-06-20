package com.lan.controller;

import com.lan.model.Event;
import com.lan.model.utilMoel.Message;
import com.lan.model.utilMoel.UserInfo;
import com.lan.service.EventService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * package com.lan.controller
 *
 * @author spoomlzx
 * @date 2017/4/24
 */
@Controller
public class EventController {
    private static final Logger logger= LoggerFactory.getLogger(EventController.class);

    @Autowired
    private EventService eventService;

    @ResponseBody
    @RequestMapping(value = "/getEvents", method = RequestMethod.POST)
    public List<Event> getEvents(@RequestParam(value = "start") String start,
                                 @RequestParam(value = "end") String end,
                                 @ModelAttribute("currentUser") UserInfo userInfo) {
        List<Event> events = eventService.getEvents(userInfo.getUnitId(), start, end);
        return events;
    }

    @ResponseBody
    @RequestMapping(value = "/addEvent", method = RequestMethod.POST)
    public Message addEvent(@RequestBody Event event, @ModelAttribute("currentUser") UserInfo userInfo) {
        Message message = new Message();
        try {
            event.setUnitId(userInfo.getUnitId());
            eventService.insertSelective(event);
            message.setData(event);
            message.setMsg("添加工作成功！");
        } catch (RuntimeException e) {
            logger.error(e.getClass().getName() + ":" + e.getMessage());
            message.setCode(0);
            message.setMsg("添加工作失败！");
        }
        return message;
    }

    @ResponseBody
    @RequestMapping(value = "/editEvent", method = RequestMethod.POST)
    public Message editEvent(@RequestBody Event event, @ModelAttribute("currentUser") UserInfo userInfo) {
        Message message = new Message();
        try {
            event.setUnitId(userInfo.getUnitId());
            eventService.update(event);
            message.setData(event);
            message.setMsg("修改工作成功！");
        } catch (RuntimeException e) {
            logger.error(e.getClass().getName() + ":" + e.getMessage());
            message.setCode(0);
            message.setMsg("修改工作失败！");
        }
        return message;
    }

    @ResponseBody
    @RequestMapping(value = "/deleteEvent/{id}", method = RequestMethod.GET)
    public Message deleteEvent(@PathVariable Integer id, @ModelAttribute("currentUser") UserInfo userInfo) {
        Message message = new Message();
        try {
            eventService.deleteEvent(userInfo.getUnitId(), id);
            message.setMsg("删除工作成功！");
        } catch (RuntimeException e) {
            logger.error(e.getClass().getName() + ":" + e.getMessage());
            message.setCode(0);
            message.setMsg("删除工作失败！");
        }
        return message;
    }
}
