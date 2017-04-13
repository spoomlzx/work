package com.lan.controller;

import com.lan.model.Event;
import com.lan.model.Unit;
import com.lan.model.User;
import com.lan.model.utilMoel.Message;
import com.lan.model.utilMoel.UserInfo;
import com.lan.service.EventService;
import com.lan.service.UnitService;
import com.lan.service.UserService;
import org.apache.ibatis.annotations.Param;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
    private final static Logger logger = LoggerFactory.getLogger(UnitController.class);
    @Autowired
    private UnitService unitService;
    @Autowired
    private EventService eventService;
    @Autowired
    private UserService userService;

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

    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseBody
    @RequestMapping(value = "/editUnit", method = RequestMethod.POST)
    public Message editUnit(@RequestBody Unit unit) {
        Message message = new Message();
        try {
            unitService.update(unit);
            unit.setIconSkin(Integer.toString(unit.getUnitTypeId()));
            message.setData(unit);
            message.setMsg("修改成功！");
        } catch (RuntimeException e) {
            logger.error(e.getClass().getName() + ":" + e.getMessage());
            message.setCode(0);
            message.setMsg("修改失败！");
        }
        return message;
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseBody
    @RequestMapping(value = "/addUnit", method = RequestMethod.POST)
    public Message addUnit(@RequestBody Unit unit) {
        Message message = new Message();
        try {
            unitService.insert(unit);
            unit.setIconSkin(Integer.toString(unit.getUnitTypeId()));
            message.setData(unit);
            message.setMsg("单位添加成功！");
        } catch (RuntimeException e) {
            logger.error(e.getClass().getName() + ":" + e.getMessage());
            message.setCode(0);
            message.setMsg("单位添加失败！");
        }
        return message;
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseBody
    @RequestMapping(value = "/delUnit/{unitId}", method = RequestMethod.GET)
    public Message delUnit(@PathVariable Integer unitId) {
        Message message = new Message();
        try {
            unitService.delete(unitId);
            message.setMsg("单位删除成功！");
        } catch (RuntimeException e) {
            logger.error(e.getClass().getName() + ":" + e.getMessage());
            message.setCode(0);
            message.setMsg("单位删除失败！");
        }
        return message;
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseBody
    @RequestMapping(value = "/getUserListByUnitId/{unitId}", method = RequestMethod.GET)
    public Message getUserListByUnitId(@PathVariable Integer unitId) {
        Message message = new Message();
        try {
            List<User> userList = userService.getUserList("USER", unitId);
            message.setData(userList);
            if (!userList.isEmpty()) {

                message.setMsg("用户查询成功！");
            } else {
                message.setCode(0);
                message.setMsg("用户查询失败！");
            }
        } catch (RuntimeException e) {
            logger.error(e.getClass().getName() + ":" + e.getMessage());
            message.setCode(0);
            message.setMsg("用户查询失败！");
        }
        return message;
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseBody
    @RequestMapping(value = "/resetPassword/{userId}", method = RequestMethod.GET)
    public Message resetPassword(@PathVariable Integer userId) {
        Message message = new Message();
        try {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            String password = encoder.encode("123456");
            userService.setPassword(password, userId);
            message.setMsg("重置密码成功！");
        } catch (RuntimeException e) {
            logger.error(e.getClass().getName() + ":" + e.getMessage());
            message.setCode(0);
            message.setMsg("重置密码失败！");
        }
        return message;
    }

    @ResponseBody
    @RequestMapping(value = "/testUserName/{username}", method = RequestMethod.GET)
    public Message testUserName(@PathVariable String username) {
        Message message = new Message();
        try {
            User user = userService.getUserByName(username);
            if (null == user) {
                message.setMsg("用户名可用！");
            } else {
                message.setCode(0);
                message.setMsg("用户名重复！");
            }
        } catch (RuntimeException e) {
            logger.error(e.getClass().getName() + ":" + e.getMessage());
            message.setCode(0);
            message.setMsg("用户名重查询失败！");
        }
        return message;
    }

    @ResponseBody
    @RequestMapping(value = "/regUser", method = RequestMethod.POST)
    public Message regUser(@RequestBody User user) {
        Message message = new Message();
        try {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            String password = encoder.encode(user.getPassword());
            user.setPassword(password);
            userService.regUser(user);
            message.setMsg("新建用户成功！");
        } catch (RuntimeException e) {
            logger.error(e.getClass().getName() + ":" + e.getMessage());
            message.setCode(0);
            message.setMsg("新建用户失败！");
        }
        return message;
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

    @ResponseBody
    @RequestMapping(value = "/addTypeWork", method = RequestMethod.POST)
    public Message addTypeWork(@Param("unitTypeId") Integer unitTypeId, @Param("workIds") Integer[] workIds) {
        Message message = new Message();
        try {
            unitService.insertTypeWorkList(unitTypeId, workIds);
            message.setCode(1);
            message.setMsg("添加成功！");
        } catch (RuntimeException e) {
            logger.error(e.getClass().getName() + ":" + e.getMessage());
            message.setCode(0);
            message.setMsg("添加失败！");
        }
        return message;
    }

    @ResponseBody
    @RequestMapping(value = "/deleteTypeWork", method = RequestMethod.POST)
    public Message deleteTypeWork(@Param("unitTypeId") Integer unitTypeId, @Param("workId") Integer workId) {
        Message message = new Message();
        try {
            unitService.deleteTypeWork(unitTypeId, workId);
            message.setCode(1);
            message.setMsg("删除成功！");
        } catch (RuntimeException e) {
            logger.error(e.getClass().getName() + ":" + e.getMessage());
            message.setCode(0);
            message.setMsg("删除失败！");
        }
        return message;
    }

}
