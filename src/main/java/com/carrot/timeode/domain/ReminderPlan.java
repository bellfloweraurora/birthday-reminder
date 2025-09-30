package com.carrot.timeode.domain;

import java.io.Serializable;
import java.time.LocalDate;
import lombok.Data;

/**
 * 
 * @TableName reminder_plan
 */
@Data
public class ReminderPlan implements Serializable {
    /**
     * id
     */
    private Integer id;

    /**
     * 关系id
     */
    private Integer relationshipId;

    /**
     * 提醒日期
     */
    private LocalDate reminderDate;

    /**
     * 提前通知的天数
     */
    private Integer daysBefore;

    /**
     * 通知类型：0-提醒用户；1-发送祝贺
     */
    private Integer reminderType;

    /**
     * 通知类型：0-待执行；1-已执行
     */
    private Integer executionStatus;

    private static final long serialVersionUID = 1L;
}