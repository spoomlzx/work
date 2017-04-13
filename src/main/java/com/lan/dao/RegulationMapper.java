package com.lan.dao;

import com.lan.model.Regulation;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegulationMapper {
    Regulation selectRegulationById(Integer reguId);

    List<Regulation> selectRegulationList();

    List<Regulation> getRegulationNames();

    List<Regulation> selectRegualtionsByIds(@Param("ids") String[] ids);

    int insertSelective(@Param("pojo") Regulation pojo);

    int insertList(@Param("pojos") List<Regulation> pojo);

    int update(@Param("pojo") Regulation pojo);

    int deleteByReguId(@Param("reguId") Integer reguId);
}
