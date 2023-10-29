package com.geek.hardwaremis_server.service.Impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.geek.hardwaremis_server.dto.*;
import com.geek.hardwaremis_server.entity.Department;
import com.geek.hardwaremis_server.entity.Staff;
import com.geek.hardwaremis_server.mapper.DepartmentMapper;
import com.geek.hardwaremis_server.mapper.StaffMapper;
import com.geek.hardwaremis_server.service.StaffService;
import com.geek.hardwaremis_server.utils.JwtUtils;
import com.geek.hardwaremis_server.utils.Result;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StaffServiceImpl implements StaffService {

    @Resource
    private StaffMapper staffMapper;

    @Resource
    private DepartmentMapper departmentMapper;

    @Override
    public Result login(LoginRequest loginRequest) {
        Staff staff = staffMapper.selectById(loginRequest.getStaffId());
        Result result;
        if (staff != null && staff.getPassword().equals(loginRequest.getPassword())) {
            String token = JwtUtils.getJwtToken(loginRequest.getStaffId());
            result = Result.ok().data("token", token);
        } else {
            result = Result.error();
        }
        return result;
    }

    @Override
    public Result register(RegisterRequest registerRequest) {
        QueryWrapper<Staff> unmatchedCountWrapper = new QueryWrapper<>();
        unmatchedCountWrapper.eq("approved", 0);
        long unmatchedCount = staffMapper.selectCount(unmatchedCountWrapper);
        Staff staff = new Staff();
        staff.setStaffId("sp" + (unmatchedCount + 1));
        staff.setPassword(registerRequest.getPassword());
        staff.setName(registerRequest.getName());
        staff.setSex(registerRequest.getSex());
        staff.setBirthday(registerRequest.getBirthday());
        staff.setTelephone(registerRequest.getTelephone());
        staff.setEmail(registerRequest.getEmail());
        staff.setDepartmentId(registerRequest.getDepartmentId());
        int insertResult = staffMapper.insert(staff);
        Result result;
        if (insertResult > 0) {
            result = Result.ok();
        } else {
            result = Result.error();
        }
        return result;
    }

    @Override
    public Result getInfo(GetInfoRequest getInfoRequest) {
        String staffId = JwtUtils.getMemberIdByJwtToken(getInfoRequest.getToken());
        Staff staff = staffMapper.selectById(staffId);
        Result result;
        if (staff != null) {
            result = Result.ok().data("staffId", staff.getStaffId())
                    .data("departmentId", staff.getDepartmentId());
        } else {
            result = Result.error();
        }
        return result;
    }

    @Override
    public Result getStaffList(GetStaffListRequest getStaffListRequest) {
        QueryWrapper<Staff> queryWrapper = new QueryWrapper<>();
        if(getStaffListRequest.getDepartmentId() != null) {
            queryWrapper.eq("department_id",getStaffListRequest.getDepartmentId());
        }
        if(getStaffListRequest.getApproved() != 0) {
            queryWrapper.eq("approved",getStaffListRequest.getApproved());
        }
        queryWrapper.eq("deleted", 0);
        List<Staff> staffList = staffMapper.selectList(queryWrapper);
        List<Map<String, Object>> dataList = new ArrayList<>();
        staffList.forEach(item -> {
            Map<String, Object> data = new HashMap<>();
            data.put("staffId", item.getStaffId());
            data.put("name", item.getName());
            data.put("sex", item.getSex() == 1 ? "男" : "女");
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            data.put("birthday", sdf.format(item.getBirthday()));
            data.put("telephone", item.getTelephone());
            data.put("email", item.getEmail());
            data.put("status", item.getApproved() == 0 ? "待审批" : "审批通过");
            data.put("departmentId", item.getDepartmentId());
            Department department = departmentMapper.selectById(item.getDepartmentId());
            data.put("department", item.getDepartmentId().equals("00") ? "" : department.getDepartmentName());
            dataList.add(data);
        });
        Result result = Result.ok();
        result.data("staffList", dataList);
        return result;
    }

    @Override
    public Result approved(ApprovedRequest approvedRequest) {
        QueryWrapper<Staff> approvedCountWrapper = new QueryWrapper<>();
        approvedCountWrapper.eq("approved", 1).eq("department_id", approvedRequest.getDepartmentId());
        long approvedCount = staffMapper.selectCount(approvedCountWrapper);
        int updateResult = staffMapper.approved(approvedRequest.getDepartmentId() + String.format("%03d", (approvedCount + 1)), approvedRequest.getStaffId());
        Result result;
        if (updateResult > 0) {
            result = this.getStaffList(new GetStaffListRequest());
        } else {
            result = Result.error();
        }
        return result;
    }

    @Override
    public Result delete(DeleteStaffRequest deleteStaffRequest) {
        Staff staff = staffMapper.selectById(deleteStaffRequest.getStaffId());
        staff.setDeleted(1);
        int updateResult = staffMapper.updateById(staff);
        Result result;
        if (updateResult > 0) {
            result = this.getStaffList(new GetStaffListRequest());
        } else {
            result = Result.error();
        }
        return result;
    }
}
