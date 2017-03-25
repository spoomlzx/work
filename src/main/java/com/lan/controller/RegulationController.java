package com.lan.controller;

import com.lan.model.Regulation;
import com.lan.model.utilMoel.Message;
import com.lan.model.utilMoel.UserInfo;
import com.lan.service.RegulationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * package com.zzc.controller
 *
 * @author spoomlzx
 * @date 2017/2/25
 */
@Controller
public class RegulationController {
    @Autowired
    private RegulationService regulationService;

    @ResponseBody
    @RequestMapping(value = {"/admin/addRegulation"}, method = RequestMethod.POST)
    public Message addRegulation(@RequestBody Regulation regulation) {
        UserInfo userInfo = (UserInfo) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        Message message = new Message();
        try {
            regulationService.insert(regulation);
            message.setMessageInfo("添加法规成功！");
        } catch (RuntimeException e) {
            message.setResult(e.getClass().getName() + ":" + e.getMessage());
            message.setMessageInfo("添加法规失败！");
        }
        return message;
    }

    /**
     * 删除regulation
     * @param reguId
     * @return
     */
    @ResponseBody
    @RequestMapping(value = {"/admin/deleteRegulation/{reguId}"},method = RequestMethod.GET)
    public Message deleteRegulation(@PathVariable Integer reguId){
        Message message=new Message();
        try{
            regulationService.deleteByReguId(reguId);
            message.setMessageInfo("删除法规成功！");
        }catch(RuntimeException e){
            message.setResult(e.getClass().getName() + ":" + e.getMessage());
            message.setMessageInfo("删除法规失败！");
        }
        return message;
    }

    /**
     * 编辑regulation
     * @param regulation
     * @return
     */
    @ResponseBody
    @RequestMapping(value = {"/admin/editRegulation"},method = RequestMethod.POST)
    public Message editRegulation(@RequestBody Regulation regulation){
        Message message = new Message();
        try{
            regulationService.update(regulation);
            message.setMessageInfo("修改法规成功！");
        }catch(RuntimeException e){
            message.setResult(e.getClass().getName() + ":" + e.getMessage());
            message.setMessageInfo("修改法规失败！");
        }
        return message;
    }
}
