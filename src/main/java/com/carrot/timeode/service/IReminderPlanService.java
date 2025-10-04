package com.carrot.timeode.service;

import com.carrot.timeode.domain.Relationship;
import com.carrot.timeode.domain.ReminderPlan;

import java.time.LocalDate;
import java.util.List;

public interface IReminderPlanService {
    Boolean plan(Relationship ship);
    void update(List<ReminderPlan> plans);
//    List<ReminderPlan> listUndoPlans(LocalDate now);
//    void plan(Relationship relationship);
//    void deleteByRelationshipId(Integer relationship);
    void executePlan(LocalDate now);




}
