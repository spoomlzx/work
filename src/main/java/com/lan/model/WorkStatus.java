package com.lan.model;

/**
 * package com.lan.model
 *
 * @author spoomlzx
 * @date 2017/3/28
 */
public class WorkStatus {
    private Integer workId;
    private String name;
    private String type;
    private Integer finishDays;
    private String status;


    public Integer getWorkId() {
        return workId;
    }

    public void setWorkId(Integer workId) {
        this.workId = workId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

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
