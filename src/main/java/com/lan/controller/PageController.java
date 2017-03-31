package com.lan.controller;

import com.baidu.ueditor.ActionEnter;
import com.lan.model.Regulation;
import com.lan.model.UnitType;
import com.lan.model.utilMoel.UserInfo;
import com.lan.service.RegulationService;
import com.lan.service.UnitService;
import com.lan.service.WorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * package com.zzc.controller
 *
 * @author spoomlzx
 * @date 2017/2/24
 */
@Controller
public class PageController {
    @Autowired
    private RegulationService regulationService;
    @Autowired
    private WorkService workService;
    @Autowired
    private UnitService unitService;


    @ResponseBody
    @RequestMapping(value = "/ued/dispatch")
    public String ueditorDispatch(HttpServletRequest request, HttpServletResponse response) {
        response.setContentType("application/json");
        String rootPath = request.getSession().getServletContext().getRealPath("/");
        String result = new ActionEnter(request, rootPath).exec();
        String action = request.getParameter("action");
        String replaceString = rootPath.replace("\\", "/");
        replaceString = replaceString.substring(0, replaceString.length() - 1);
        //应对ueditor返回file&img路径为绝对路径的BUG
        if (action != null && (action.equals("listimage") || action.equals("listfile"))) {
            result = result.replaceAll(replaceString, "");
        }
        return result;

    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String redirectToHomePage() {
        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            return "redirect:login";
        }
        if (SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString().endsWith("anonymousUser")) {
            return "redirect:login";
        }
        return "redirect:work";
    }


    @RequestMapping(value = "/admin/index")
    public String adminIndexPage(Model model, HttpServletRequest request) {

        return "adminindex";
    }

    @RequestMapping(value = "/index")
    public String indexPage(Model model, HttpServletRequest request) {
        return "index";
    }


    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String loginPage(Model model, @RequestParam(value = "login_error", required = false, defaultValue = "") String login_error) {
        if ("true".equals(login_error)) {
            model.addAttribute("result", "has-error");
        }
        return "login";
    }

    @RequestMapping(value = "/work")
    public String workPage(Model model, @ModelAttribute("currentUser") UserInfo userInfo) {
        String[] typelist = {"年度", "半年", "季度", "月度", "周", "日", "按需"};
        model.addAttribute("typelist", typelist);
        model.addAttribute("unitTypeId", userInfo.getUnitTypeId());
        model.addAttribute("unitId", userInfo.getUnitId());
        if ("ADMIN".equals(userInfo.getRole())) {
            List<UnitType> unitTypes = unitService.getUnitTypeList();
            model.addAttribute("unitTypes", unitTypes);
            return "adminwork";
        } else {
            return "work";
        }
    }

    @RequestMapping(value = "/regulation")
    public String regulationPage(Model model, HttpServletRequest request) {
        List<Regulation> regulations = regulationService.selectRegulationList();
        model.addAttribute("regulations", regulations);
        return "regulation";
    }

    @RequestMapping(value = "/progress")
    public String progressPage(Model model, HttpServletRequest request) {
        List<Regulation> regulations = regulationService.selectRegulationList();
        model.addAttribute("regulations", regulations);
        return "progress";
    }

    @RequestMapping(value = "/temp")
    public String tempWorkPage(Model model, @ModelAttribute("currentUser") UserInfo userInfo) {
        return "temp";
    }
}
