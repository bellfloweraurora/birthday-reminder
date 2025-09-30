package com.carrot.timeode.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class RelationshipAddDTO {
//    /**
//     * id
//     */
//    private Integer id;

    /**
     * 亲友姓名
     */
    private String name;

    /**
     * 0-公历；1-农历
     */
    private Integer calendarType;

    /**
     * 生日日期
     */
    private LocalDate birthday;

    /**
     * 生日-月份
     */
    private Integer birthdayMonth;

    /**
     * 生日-天
     */
    private Integer birthdayDay;

    /**
     * 标签
     */
    private String tag;

    /**
     * 是否启用提醒：0-否；1-是
     */
    private Boolean reminderEnabled;

    /**
     * 是否替我祝贺：0-否；1-是
     */
    private Boolean congratulateEnabled;

    /**
     * 亲友邮箱
     */
    private String relationshipEmail;

    /**
     * 招呼语
     */
    private String greeting;

    /**
     * 自称
     */
    private String selfCall;

    /**
     * 提前通知的天数
     */
    private List<Integer> daysBefore;

    /**
     *
     */
    private String notes;

//    private static final long serialVersionUID = 1L;

}
