package com.geek.hardwaremis_server.controller;

import com.geek.hardwaremis_server.dto.EditDepartmentRequest;
import com.geek.hardwaremis_server.dto.GetDepartmentListRequest;
import com.geek.hardwaremis_server.service.DepartmentService;
import com.geek.hardwaremis_server.utils.Result;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/department")
public class DepartmentController {

    @Resource
    private DepartmentService departmentService;

    @PostMapping("/getDepartmentList")
    public Result getDepartmentList(@RequestBody GetDepartmentListRequest getDepartmentListRequest) {
        return departmentService.getDepartmentList(getDepartmentListRequest);
    }

    @PostMapping("/editDepartment")
    public Result editDepartment(@RequestBody EditDepartmentRequest editDepartmentRequest) {
        return departmentService.editDepartment(editDepartmentRequest);
    }

}
