package com.geek.hardwaremis_server.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

@Data
public class Customer {

    @TableId(value = "customer_id", type = IdType.NONE)
    private String customerId;

    private String name;

    private String telephone;

    private String address;

    private String email;
}
