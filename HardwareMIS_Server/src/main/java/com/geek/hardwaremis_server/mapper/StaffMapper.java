package com.geek.hardwaremis_server.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.geek.hardwaremis_server.entity.Staff;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface StaffMapper extends BaseMapper<Staff> {

    @Update("UPDATE staff SET staff_id = #{newStaffId}, approved = 1 WHERE staff_id = #{oldStaffId}")
    int approved(String newStaffId, String oldStaffId);
}
