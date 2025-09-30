package com.carrot.timeode.mapper;

import com.carrot.timeode.domain.Relationship;
import com.carrot.timeode.dto.RelationshipPageDTO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;


import java.util.List;

/**
* @author 86136
* @description 针对表【relationship】的数据库操作Mapper
* @createDate 2025-09-24 13:11:59
 * @Entity com.carrot.timeode.domain.Relationship
 */
@Mapper
public interface RelationshipMapper {

    List<Relationship> list(RelationshipPageDTO dto);

    int add(Relationship entity);
}




