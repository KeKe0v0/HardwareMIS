package com.geek.hardwaremis_server.controller;

import com.geek.hardwaremis_server.dto.*;
import com.geek.hardwaremis_server.service.StaffService;
import com.geek.hardwaremis_server.utils.Result;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/staff")
public class StaffController {

    @Resource
    private StaffService staffService;

    @PostMapping("/login")
    public Result login(@RequestBody LoginRequest loginRequest) {
        return staffService.login(loginRequest);
    }

    @PostMapping("/register")
    public Result register(@RequestBody RegisterRequest registerRequest) {
        return staffService.register(registerRequest);
    }

    @PostMapping("/getInfo")
    public Result getInfo(@RequestBody GetInfoRequest getInfoRequest) {
        return staffService.getInfo(getInfoRequest);
    }

    @PostMapping("/getStaffList")
    public Result getStaffList(@RequestBody GetStaffListRequest getStaffListRequest) {
        return staffService.getStaffList(getStaffListRequest);
    }

    @PostMapping("/approved")
    public Result approved(@RequestBody ApprovedRequest approvedRequest) {
        return staffService.approved(approvedRequest);
    }

    @PostMapping("/delete")
    public Result delete(@RequestBody DeleteStaffRequest deleteStaffRequest) {
        return staffService.delete(deleteStaffRequest);
    }

}
