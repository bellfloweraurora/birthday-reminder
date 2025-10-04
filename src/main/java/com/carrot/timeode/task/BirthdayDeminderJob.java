package com.carrot.timeode.task;

import com.carrot.timeode.service.IReminderPlanService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@Slf4j
public class BirthdayDeminderJob {
    @Autowired
    private IReminderPlanService planService;
    @Scheduled(cron = "0 0 9,12,20 * * ?")
    public void reminder(){
        //扫描当天未执行的计划
        planService.executePlan(LocalDate.now());


    }
}
