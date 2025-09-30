package com.carrot.timeode.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/hello")
@CrossOrigin//临时解决跨域问题
public class HelloController {
    @GetMapping("/test")
    public String test(){
        return "carrot";

    }
}
