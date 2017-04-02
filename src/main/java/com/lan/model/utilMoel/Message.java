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
    private int code=1;
    private String msg;
    private Object data;

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
