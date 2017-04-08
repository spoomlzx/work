package com.lan.model;

import java.util.List;

/**
 * package com.zzc.model
 * 包含content,basis等信息的Work
 *
 * @author spoomlzx
 * @date 2017/3/22
 */
public class WorkFull extends Work {
    private String basis;

    private String content;

    private String flowChart;

    private String regulationIds;

    private String tips;

    private List<Regulation> regulations;

    private Boolean check;

    public Boolean getCheck() {
        return check;
    }

    public void setCheck(Boolean check) {
        this.check = check;
    }

    public String getBasis() {
        return basis;
    }

    public void setBasis(String basis) {
        this.basis = basis;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getFlowChart() {
        return flowChart;
    }

    public void setFlowChart(String flowChart) {
        this.flowChart = flowChart;
    }

    public String getRegulationIds() {
        return regulationIds;
    }

    public void setRegulationIds(String regulationIds) {
        this.regulationIds = regulationIds;
    }

    public String getTips() {
        return tips;
    }

    public void setTips(String tips) {
        this.tips = tips;
    }

    public List<Regulation> getRegulations() {
        return regulations;
    }

    public void setRegulations(List<Regulation> regulations) {
        this.regulations = regulations;
    }
}
