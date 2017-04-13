package com.lan.dao;

import com.lan.model.Unit;
import com.lan.model.UnitType;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UnitMapper {
    List<Unit> getUnitTreeById(Integer unitId);

    List<UnitType> getUnitTypeList();


    int insertSelective(@Param("pojo") Unit pojo);

    int update(@Param("pojo") Unit pojo);

    int delete(@Param("unitId") Integer unitId);

    int insertTypeWorkList(@Param("unitTypeId") Integer unitTypeId,@Param("workIds") Integer[] workIds);

    int deleteTypeWork(@Param("unitTypeId") Integer unitTypeId,@Param("workId") Integer workId);
}
