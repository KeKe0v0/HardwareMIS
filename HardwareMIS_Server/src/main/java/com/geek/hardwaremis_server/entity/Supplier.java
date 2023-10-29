package com.geek.hardwaremis_server.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

@Data
public class Supplier {

    @TableId(value = "supplier_id", type = IdType.NONE)
    private String supplierId;

    private String name;

    private String address;

    private String linkman;

    private String telephone;


}
