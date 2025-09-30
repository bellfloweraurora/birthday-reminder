package com.carrot.timeode.service;

import com.carrot.timeode.domain.Relationship;
import com.carrot.timeode.dto.RelationshipAddDTO;
import com.carrot.timeode.dto.RelationshipPageDTO;
import com.carrot.timeode.vo.RelationshipPageVO;
import com.github.pagehelper.PageInfo;

public interface IRelationshipService {
    /**
     * 分页查询
     * @param dto
     * @return
     */
    PageInfo<RelationshipPageVO> page(RelationshipPageDTO dto);

    Relationship add(RelationshipAddDTO dto);
}
