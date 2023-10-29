package com.geek.hardwaremis_server.dto;

import lombok.Data;

import java.util.Date;

@Data
public class RegisterRequest {

    private String password;

    private String name;

    private int sex;

    private Date birthday;

    private String telephone;

    private String email;

    private String departmentId;

}
