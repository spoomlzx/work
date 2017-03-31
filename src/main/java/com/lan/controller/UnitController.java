package com.lan.controller;

import com.lan.model.Event;
import com.lan.model.Unit;
import com.lan.service.EventService;
import com.lan.service.UnitService;
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
    public List<Event> getEvents(@RequestParam("unitId") Integer unitId,
                                 @RequestParam(value = "start") String start,
                                 @RequestParam(value = "end") String end) {
        List<Event> events = eventService.getEvents(unitId, start, end);
        return events;
    }


}
