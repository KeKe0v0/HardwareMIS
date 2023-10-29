package com.geek.hardwaremis_server.service.Impl;

import com.geek.hardwaremis_server.dto.EditDepartmentRequest;
import com.geek.hardwaremis_server.dto.GetDepartmentListRequest;
import com.geek.hardwaremis_server.entity.Department;
import com.geek.hardwaremis_server.entity.Staff;
import com.geek.hardwaremis_server.mapper.DepartmentMapper;
import com.geek.hardwaremis_server.mapper.StaffMapper;
import com.geek.hardwaremis_server.service.DepartmentService;
import com.geek.hardwaremis_server.utils.Result;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    @Resource
    private DepartmentMapper departmentMapper;
    @Resource
    private StaffMapper staffMapper;


    @Override
    public Result getDepartmentList(GetDepartmentListRequest getDepartmentListRequest) {
        List<Department> departmentList = departmentMapper.selectList(null);
        Result result = Result.ok();
        List<Map<String, Object>> dataList = new ArrayList<>();
        departmentList.forEach(item -> {
            Map<String, Object> data = new HashMap<>();
            data.put("departmentId", item.getDepartmentId());
            data.put("departmentName", item.getDepartmentName());
            data.put("telephone", item.getTelephone());
            Staff staff = staffMapper.selectById(item.getStaffId());
            data.put("linkman", staff.getName());
            dataList.add(data);
        });
        result.data("departmentList", dataList);
        return result;
    }

    @Override
    public Result editDepartment(EditDepartmentRequest editDepartmentRequest) {
        Staff staff = staffMapper.selectById(editDepartmentRequest.getStaffId());
        Department department = departmentMapper.selectById(editDepartmentRequest.getDepartmentId());
        department.setStaffId(staff.getStaffId());
        department.setTelephone(staff.getTelephone());
        int updateResult = departmentMapper.updateById(department);
        Result result;
        if (updateResult > 0) {
            result = this.getDepartmentList(new GetDepartmentListRequest());
        } else {
            result = Result.error();
        }
        return result;
    }
}
