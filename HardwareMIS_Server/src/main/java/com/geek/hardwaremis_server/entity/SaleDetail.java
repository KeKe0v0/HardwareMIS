package com.geek.hardwaremis_server.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class SaleDetail {

    @TableId(value = "sale_detail_id", type = IdType.NONE)
    private String saleDetailId;

    private String saleId;

    private String hardwareId;

    private BigDecimal salePrice;

    private int saleNumber;
}
