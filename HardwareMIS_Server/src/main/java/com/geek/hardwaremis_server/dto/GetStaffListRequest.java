package com.geek.hardwaremis_server.dto;

import lombok.Data;

@Data
public class GetStaffListRequest {

    private String departmentId;

    private int approved;

}
