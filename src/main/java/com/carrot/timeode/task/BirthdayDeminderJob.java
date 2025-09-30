package com.carrot.timeode.task;

import com.carrot.timeode.service.RelationshipPlanService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Component
@Slf4j
public class BirthdayDeminderJob {
    @Autowired
    private RelationshipPlanService planService;
    @Scheduled(cron = "0 0 9,12,20 * * ?")
    public void reminder(){
        //扫描当天未执行的计划
        planService.executePlan(LocalDate.now());

    }
}
