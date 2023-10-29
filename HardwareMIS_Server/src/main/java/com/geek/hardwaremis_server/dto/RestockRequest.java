package com.geek.hardwaremis_server.dto;

import lombok.Data;

@Data
public class RestockRequest {

    private String hardwareId;

    private int restockNumber;

}
