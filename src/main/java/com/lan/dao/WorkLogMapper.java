package com.lan.dao;

import com.lan.model.WorkLog;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkLogMapper {
    List<WorkLog> selectLogList(@Param("workId") Integer workId,@Param("unitId") Integer unitId);

    int insert(@Param("pojo") WorkLog pojo);

    int insertSelective(@Param("pojo") WorkLog pojo);

    int insertList(@Param("pojos") List<WorkLog> pojo);

    int update(@Param("pojo") WorkLog pojo);
}
