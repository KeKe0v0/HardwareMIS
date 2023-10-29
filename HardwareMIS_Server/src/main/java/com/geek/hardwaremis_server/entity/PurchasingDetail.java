package com.geek.hardwaremis_server.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class PurchasingDetail {

    @TableId(value = "purchasing_detail_id", type = IdType.NONE)
    private String purchasingDetailId;

    private String purchasingId;

    private String hardwareId;

    private BigDecimal purchasingPrice;

    private int purchasingNumber;

    private Date shippingTime;

    private String trackingNumber;

    private int status;
}
