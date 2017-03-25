package com.lan.dao;

import com.lan.model.History;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoryMapper {
    int deleteByPrimaryKey(Integer historyId);

    History selectByPrimaryKey(Integer historyId);
}