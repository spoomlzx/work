package com.lan.dao;

import com.lan.model.Work;
import com.lan.model.WorkFull;
import com.lan.model.WorkStatus;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkMapper {

    /**
     * 获取work的type
     * @param workId
     * @return
     */
    String getTypeById(Integer workId);

    /**
     * 获取一条work,不包括status
     * @param workId
     * @return
     */
    WorkFull selectWorkById(Integer workId);

    /**
     * 获取unitTypeId对应的所有work的list
     * @param unitTypeId
     * @return
     */
    List<Work> getWorkListByTypeId(Integer unitTypeId);

    /**
     * 获取一条work，包括status信息
     * @param workId
     * @param unitId
     * @param index
     * @return
     */
    WorkFull selectWork(@Param("workId") Integer workId, @Param("unitId") Integer unitId, @Param("index") String index);

    /**
     * 获取unitId对应的worklist，包括work现在的完成状态
     * @param unitId
     * @param index
     * @param type
     * @return
     */
    List<WorkFull> selectWorkListByUnitId(@Param("unitId") Integer unitId, @Param("index") String index, @Param("type") String type);

    /**
     * search到的work的ids
     * @param unitTypeId
     * @param keyword
     * @return
     */
    List<Integer> selectWorkIdsByKeyword(@Param("unitTypeId") Integer unitTypeId, @Param("keyword") String keyword);

    /**
     * 获取单位的所有工作的list，包括status
     * @param unitId
     * @param index
     * @return
     */
    List<WorkStatus> getWorkListWithStatus(@Param("unitId") Integer unitId,@Param("index") String index);

    int deleteWorkRecord(@Param("workId") Integer workId, @Param("unitId") Integer unitId, @Param("index") String index);
    int insertWorkRecord(@Param("workId") Integer workId, @Param("unitId") Integer unitId, @Param("index") String index);

    int insert(@Param("pojo") Work pojo);

    int insertSelective(@Param("pojo") Work pojo);

    int insertList(@Param("pojos") List<Work> pojo);

    int update(@Param("pojo") Work pojo);

    int delete(@Param("workId") Integer workId);
}
