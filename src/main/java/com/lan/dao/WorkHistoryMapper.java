package com.lan.dao;

import com.lan.model.WorkHistory;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkHistoryMapper {
    List<WorkHistory> getWorkHistoryByUnitId(Integer unitId);

    int insert(@Param("pojo") WorkHistory pojo);

    int update(@Param("pojo") WorkHistory pojo);
}
