package com.geek.hardwaremis_server.service;

import com.geek.hardwaremis_server.dto.*;
import com.geek.hardwaremis_server.utils.Result;

public interface DepartmentService {


    Result getDepartmentList(GetDepartmentListRequest getDepartmentListRequest);

    Result editDepartment(EditDepartmentRequest editDepartmentRequest);
}
