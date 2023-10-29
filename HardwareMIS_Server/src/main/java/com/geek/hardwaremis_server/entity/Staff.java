package com.geek.hardwaremis_server.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import java.util.Date;

@Data
public class Staff {

    @TableId(value = "staff_id", type = IdType.NONE)
    private String staffId;

    private String password;

    private String name;

    private int sex;

    private Date birthday;

    private String telephone;

    private String email;

    private String departmentId;

    private int deleted;

    private int approved;


}
