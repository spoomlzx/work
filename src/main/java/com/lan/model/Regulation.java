package com.lan.model;

public class Regulation {
    private Integer reguId;

    private String title;

    private String content;

    private String category;

    private String department;

    public Integer getReguId() {
        return reguId;
    }

    public void setReguId(Integer reguId) {
        this.reguId = reguId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category == null ? null : category.trim();
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department == null ? null : department.trim();
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }
}