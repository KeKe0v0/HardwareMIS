package com.geek.hardwaremis_server.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

@Data
public class Department {

    @TableId(value = "department_id", type = IdType.NONE)
    private String departmentId;

    private String departmentName;

    private String staffId;

    private String telephone;

}
