package com.lan.model.utilMoel;

import java.io.Serializable;

/**
 * package com.zzc.model
 *
 * @author spoomlzx
 * @date 2017/3/12
 */
public class Message implements Serializable {

    private static final long serialVersionUID = -8384851165488597002L;
    private String result = "success";
    private String messageInfo;
    private Object object;

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getMessageInfo() {
        return messageInfo;
    }

    public void setMessageInfo(String messageInfo) {
        this.messageInfo = messageInfo;
    }

    public Object getObject() {
        return object;
    }

    public void setObject(Object object) {
        this.object = object;
    }
}
