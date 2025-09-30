--用户体系(暂忽略)

--亲友关系表

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for relationship
-- ----------------------------
DROP TABLE IF EXISTS `relationship`;
CREATE TABLE `relationship`  (
                                 `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'id',
                                 `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '亲友姓名',
                                 `calendar_type` tinyint NOT NULL COMMENT '0-公历；1-农历',
                                 `birthday` date NULL DEFAULT NULL COMMENT '生日日期',
                                 `birthday_month` int NOT NULL COMMENT '生日-月份',
                                 `birthday_day` int NOT NULL COMMENT '生日-天',
                                 `tag` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '标签',
                                 `reminder_enabled` tinyint NOT NULL DEFAULT 0 COMMENT '是否启用提醒：0-否；1-是',
                                 `congratulate_enabled` tinyint NOT NULL DEFAULT 0 COMMENT '是否替我祝贺：0-否；1-是',
                                 `relationship_email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '亲友邮箱',
                                 `greeting` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '招呼语',
                                 `self_call` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '自称',
                                 `days_before` json NULL COMMENT '提前通知的天数',
                                 `notes` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
                                 PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;


--提醒计划表
DROP TABLE IF EXISTS `reminder_plan`;
CREATE TABLE `reminder_plan`  (
                                  `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'id',
                                  `relationship_id` int NOT NULL COMMENT '关系id',
                                  `reminder_date` date DEFAULT NULL COMMENT '提醒日期',
                                  `days_before` int NULL COMMENT '提前通知的天数',
                                  `reminder_type` tinyint NOT NULL DEFAULT 0 COMMENT'通知类型：0-提醒用户；1-发送祝贺',
                                  `execution_status` tinyint NOT NULL DEFAULT 0 COMMENT '通知类型：0-待执行；1-已执行',
                                  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;
--提醒记录表
DROP TABLE IF EXISTS `reminder_record`;
CREATE TABLE `reminder_record`  (
                                    `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'id',
                                    `relationship_id` int NOT NULL COMMENT '关系id',
                                    `reminder_time` datetime DEFAULT NULL COMMENT '提醒时间',
                                    `receiver` varchar(50) DEFAULT NULL COMMENT '接收者',
                                    `reminder_type` tinyint NOT NULL DEFAULT 0 COMMENT '通知类型：0-提醒用户；1-发送祝贺',
                                    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;
