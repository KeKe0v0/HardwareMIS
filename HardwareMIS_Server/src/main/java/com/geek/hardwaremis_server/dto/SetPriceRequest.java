package com.geek.hardwaremis_server.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class SetPriceRequest {

    private String hardwareId;

    private BigDecimal price;

    private String unit;

}
