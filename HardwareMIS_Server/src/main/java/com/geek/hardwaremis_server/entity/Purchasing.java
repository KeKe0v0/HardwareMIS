package com.geek.hardwaremis_server.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import java.util.Date;

@Data
public class Purchasing {

    @TableId(value = "purchasing_id", type = IdType.NONE)
    private String purchasingId;

    private String supplierId;

    private String staffId;

    private Date orderTime;
}
