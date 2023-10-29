package com.geek.hardwaremis_server.dto;

import lombok.Data;

import java.util.List;

@Data
public class StockoutPurchasingRequest {

    private String staffId;

    private String supplierId;

    private List<String> restockIdList;

    private List<StockoutPurchasingListRequest> stockoutPurchasingList;

}
