package com.lan.controller;

import com.lan.model.utilMoel.UserInfo;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

/**
 * package com.lan.controller
 *
 * @author spoomlzx
 * @date 2017/3/25
 */
@ControllerAdvice
public class CurrentUserControllerAdvice {

    @ModelAttribute("currentUser")
    public UserInfo getCurrentUser(Authentication authentication) {
        return (authentication == null) ? null : (UserInfo) authentication.getPrincipal();
    }
}
