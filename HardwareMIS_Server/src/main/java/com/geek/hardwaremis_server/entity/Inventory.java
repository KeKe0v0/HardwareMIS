package com.geek.hardwaremis_server.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

@Data
public class Inventory {

    @TableId(value = "hardware_id", type = IdType.NONE)
    private String hardwareId;

    private int inventory;


}
