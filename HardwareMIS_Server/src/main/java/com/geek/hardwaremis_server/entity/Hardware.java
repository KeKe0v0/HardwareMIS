package com.geek.hardwaremis_server.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class Hardware {

    @TableId(value = "hardware_id", type = IdType.NONE)
    private String hardwareId;

    private String type;

    private String model;

    private String brand;

    private BigDecimal price;

    private String unit;

}
