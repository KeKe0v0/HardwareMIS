package com.geek.hardwaremis_server.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class NewSaleOrderDetailRequest {

    private String hardwareId;

    private BigDecimal salePrice;

    private int saleNumber;

}
