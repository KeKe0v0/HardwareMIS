package com.geek.hardwaremis_server.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import java.util.Date;

@Data
public class Sale {

    @TableId(value = "sale_id", type = IdType.NONE)
    private String saleId;

    private Date orderTime;

    private String staffId;

    private String customerId;

    private Date shippingTime;

    private String trackingNumber;

    private int status;
}
