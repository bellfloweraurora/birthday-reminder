package com.carrot.timeode.controller;

import com.carrot.timeode.domain.Relationship;
import com.carrot.timeode.domain.ReminderPlan;
import com.carrot.timeode.dto.RelationshipAddDTO;
import com.carrot.timeode.dto.RelationshipPageDTO;
import com.carrot.timeode.service.IRelationshipService;
import com.carrot.timeode.service.IReminderPlanService;
import com.carrot.timeode.vo.RelationshipPageVO;
import com.carrot.timeode.vo.ResponseEntity;
import com.github.pagehelper.PageInfo;
import jakarta.annotation.Resource;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/relationship")
@CrossOrigin//临时解决跨域问题
public class RelationshipController {
    //整体的封装
    //分类
    @Resource
    private IRelationshipService relationshipService;
    @Resource
    private IReminderPlanService reminderPlanService;

    @GetMapping("/page")
    public ResponseEntity<PageInfo<RelationshipPageVO>> page(RelationshipPageDTO dto){
        System.out.println("！！！！！！！！！！page and size ！！！！！！" + dto.getPage() + ',' + dto.getSize());
        PageInfo<RelationshipPageVO> page = relationshipService.page(dto);
        return ResponseEntity.success(page);
    }
    @PostMapping(value = "/add")
    @Transactional
    public ResponseEntity<Boolean> add(@RequestBody RelationshipAddDTO dto){
        //事务

        Relationship ship = relationshipService.add(dto);
        Boolean success = reminderPlanService.plan(ship);
        return ResponseEntity.success(success);
    }

}
