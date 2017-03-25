package com.lan.model;

import java.util.Date;

/**
 * package com.zzc.model
 *
 * @author spoomlzx
 * @date 2017/3/14
 */
public class WorkHistory {
    private Integer unitId;
    private Integer workId;
    private String name;
    private String type;
    private String status;
    private Date limit;

    public Integer getUnitId() {
        return unitId;
    }

    public void setUnitId(Integer unitId) {
        this.unitId = unitId;
    }

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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getLimit() {
        return limit;
    }

    public void setLimit(Date limit) {
        this.limit = limit;
    }
}
