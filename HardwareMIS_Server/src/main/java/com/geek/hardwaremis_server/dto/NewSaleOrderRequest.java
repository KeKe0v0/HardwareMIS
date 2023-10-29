package com.geek.hardwaremis_server.dto;

import lombok.Data;

import java.util.List;

@Data
public class NewSaleOrderRequest {

    private String staffId;

    private String customerId;

    private List<NewSaleOrderDetailRequest> saleDetail;

}
