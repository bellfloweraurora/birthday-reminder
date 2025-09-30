package com.carrot.timeode.service.impl;

import cn.hutool.core.collection.CollUtil;
import com.carrot.timeode.domain.ReminderPlan;
import com.carrot.timeode.mapper.ReminderPlanMapper;
import com.carrot.timeode.service.RelationshipPlanService;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
@Service
@Slf4j
public class RelationshipPlanServiceImpl implements RelationshipPlanService {
    @Resource
    private ReminderPlanMapper mapper;

    @Override
    public void update(List<ReminderPlan> plans) {
        mapper.update(plans);
    }

    @Override
    public List<ReminderPlan> listUndoPlans(LocalDate now) {
        return List.of();
    }
    @Override
    @Transactional
    public void executePlan(LocalDate now) {
        List<ReminderPlan> plans =mapper.ListUndoPlans(now);
        if(CollUtil.isEmpty(plans)){
            log.info("当前没有执行计划");
            return;
        }
        for(ReminderPlan plan :plans){
            log.info("开始执行计划：{}",plan);
            plan.setExecutionStatus(1);
            //发送邮件
            mapper.update(plans);
            //todo 将发送记录保存下来

        }
    }
}
