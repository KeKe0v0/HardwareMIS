package com.geek.hardwaremis_server.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

@Data
public class Restock {

    @TableId(value = "restock_id", type = IdType.NONE)
    private String restockId;

    private String hardwareId;

    private int restockNumber;

    private int status;


}
