package com.lan.controller;

import com.lan.model.Unit;
import com.lan.service.UnitService;
import com.lan.service.WorkHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

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
    private WorkHistoryService workHistoryService;

    /**
     * 返回单位树的json
     * @param unitId
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/getUnitTree/{unitId}",method = RequestMethod.GET)
    public List<Unit> getUnitTree(@PathVariable Integer unitId){
        List<Unit> units=unitService.getUnitTreeById(unitId);
        return units;
    }


}
