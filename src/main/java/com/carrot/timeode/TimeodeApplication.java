package com.carrot.timeode;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@MapperScan("com.carrot.timeode.mapper")
@EnableScheduling
public class TimeodeApplication  {
    public static void main(String[] args) {
        SpringApplication.run(TimeodeApplication.class,args);
    }
}
