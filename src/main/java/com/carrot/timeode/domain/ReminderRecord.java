package com.carrot.timeode.domain;

import java.io.Serializable;
import java.time.LocalDateTime;
import lombok.Data;

/**
 * 
 * @TableName reminder_record
 */
@Data
public class ReminderRecord implements Serializable {
    /**
     * id
     */
    private Integer id;

    /**
     * 关系id
     */
    private Integer relationshipId;

    /**
     * 提醒时间
     */
    private LocalDateTime reminderTime;

    /**
     * 接收者
     */
    private String receiver;

    /**
     * 通知类型：0-提醒用户；1-发送祝贺
     */
    private Integer reminderType;

    private static final long serialVersionUID = 1L;
}