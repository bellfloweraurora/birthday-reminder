package com.carrot.timeode.service;

import com.carrot.timeode.domain.ReminderPlan;

import java.time.LocalDate;
import java.util.List;

public interface RelationshipPlanService {
//    void plan(Relationship relationship);
//    void deleteByRelationshipId(Integer relationship);
    void update(List<ReminderPlan> plans);
    List<ReminderPlan> listUndoPlans(LocalDate now);
    void executePlan(LocalDate now);
}
