package com.carrot.timeode.test;


import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component

public class HelloTest {
    @Scheduled(cron = "0/5 * * * * ?")
    public void hello(){
        System.out.println("hello world");
    }
}
