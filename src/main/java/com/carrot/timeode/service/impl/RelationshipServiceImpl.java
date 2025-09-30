package com.carrot.timeode.service.impl;

import cn.hutool.core.collection.CollectionUtil;
import com.carrot.timeode.domain.Relationship;
import com.carrot.timeode.dto.RelationshipAddDTO;
import com.carrot.timeode.dto.RelationshipPageDTO;
import com.carrot.timeode.mapper.RelationshipMapper;
import com.carrot.timeode.service.IRelationshipService;
import com.carrot.timeode.vo.RelationshipPageVO;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import jakarta.annotation.Resource;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.stream.Collectors;

import java.util.List;


@Service
public class RelationshipServiceImpl implements IRelationshipService {

    @Resource
    private RelationshipMapper relationshipMapper;

    @Override
    public PageInfo<RelationshipPageVO> page(RelationshipPageDTO dto) {
        //分页逻辑
        PageHelper.startPage(dto.getPage(),dto.getSize());
        List<Relationship> relations = relationshipMapper.list(dto);//列表查询
        PageInfo<Relationship> userPageInfo = new PageInfo<>(relations);

        PageInfo<RelationshipPageVO> page = new PageInfo<>();
        BeanUtils.copyProperties(userPageInfo,page);
        if(CollectionUtil.isNotEmpty(relations)){
            List<RelationshipPageVO> vos =relations.stream().map(relationship -> {
                RelationshipPageVO vo = new RelationshipPageVO();
                BeanUtils.copyProperties(relationship,vo);
                return vo;
            }).collect(Collectors.toList());
            page.setList(vos);
        }
        return page;
    }

    @Override
    public Relationship add(RelationshipAddDTO dto) {
        Relationship entity = new Relationship();
        BeanUtils.copyProperties(dto, entity);
        LocalDate birthday = dto.getBirthday();
        entity.setBirthdayMonth(birthday.getMonthValue());
        entity.setBirthdayDay(birthday.getDayOfMonth());
        relationshipMapper.add(entity);
        return entity;
    }
}
