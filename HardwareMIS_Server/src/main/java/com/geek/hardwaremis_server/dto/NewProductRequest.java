package com.geek.hardwaremis_server.dto;

import lombok.Data;

import java.util.List;

@Data
public class NewProductRequest {

    private String supplierId;

    private String staffId;

    private List<NewProductDetailRequest> newProductDetail;


}
