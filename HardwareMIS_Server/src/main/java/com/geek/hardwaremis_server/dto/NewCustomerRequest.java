package com.geek.hardwaremis_server.dto;

import lombok.Data;

@Data
public class NewCustomerRequest {

    private String name;

    private String telephone;

    private String address;

    private String email;

}
