package com.lan.model;

import java.util.List;

/**
 * package com.zzc.model
 *
 * @author spoomlzx
 * @date 2017/3/13
 */
public class WorkSet {
    private String workType;
    private Integer workNum;
    private List<WorkStatus> workList;

    public String getWorkType() {
        return workType;
    }

    public void setWorkType(String workType) {
        this.workType = workType;
    }

    public Integer getWorkNum() {
        return workNum;
    }

    public void setWorkNum(Integer workNum) {
        this.workNum = workNum;
    }

    public List<WorkStatus> getWorkList() {
        return workList;
    }

    public void setWorkList(List<WorkStatus> workList) {
        this.workList = workList;
    }
}
