package com.geek.hardwaremis_server.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class StockoutPurchasingListRequest {

    private String hardwareId;

    private String type;

    private String model;

    private String brand;

    private BigDecimal purchasingPrice;

    private int restockNumber;


}
