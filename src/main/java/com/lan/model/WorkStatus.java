package com.lan.model;

/**
 * package com.lan.model
 * 包含status的Work
 *
 * @author spoomlzx
 * @date 2017/3/28
 */
public class WorkStatus extends Work {
    private Integer finishDays;
    private String status;

    public Integer getFinishDays() {
        return finishDays;
    }

    public void setFinishDays(Integer finishDays) {
        this.finishDays = finishDays;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
