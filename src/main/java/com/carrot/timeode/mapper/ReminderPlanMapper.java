package com.carrot.timeode.mapper;

import com.carrot.timeode.domain.ReminderPlan;

import java.time.LocalDate;
import java.util.List;

/**
* @author 86136
* @description 针对表【reminder_plan】的数据库操作Mapper
* @createDate 2025-09-24 13:11:59
* @Entity com.carrot.timeode.domain.ReminderPlan
*/
public interface ReminderPlanMapper {

    int batchAdd(List<ReminderPlan> plans);

    List<ReminderPlan> ListUndoPlans(LocalDate now);
    void update(List<ReminderPlan> plans);

}




