package com.lan.model.utilMoel;

import java.util.Map;

/**
 * package com.zzc.model.utilMoel
 *
 * @author spoomlzx
 * @date 2017/3/22
 */
public class WorkStatus {
    private String type;
    private Map<Integer,Integer> status;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Map<Integer, Integer> getStatus() {
        return status;
    }

    public void setStatus(Map<Integer, Integer> status) {
        this.status = status;
    }
}
