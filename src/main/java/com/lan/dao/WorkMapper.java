package com.lan.dao;

import com.lan.model.Work;
import com.lan.model.WorkFull;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkMapper {

    WorkFull selectWork(@Param("workId") Integer workId, @Param("unitId") Integer unitId, @Param("index") String index);

    List<Work> selectWorkList(@Param("unitTypeId") Integer unitTypeId, @Param("type") String type);

    List<Integer> selectWorkIdsByKeyword(@Param("unitTypeId") Integer unitTypeId, @Param("keyword") String keyword);

    int insert(@Param("pojo") Work pojo);

    int insertSelective(@Param("pojo") Work pojo);

    int insertList(@Param("pojos") List<Work> pojo);

    int update(@Param("pojo") Work pojo);
}
