package com.geek.hardwaremis_server.service;

import com.geek.hardwaremis_server.dto.*;
import com.geek.hardwaremis_server.utils.Result;

public interface StaffService {

    Result login(LoginRequest loginRequest);

    Result register(RegisterRequest registerRequest);

    Result getInfo(GetInfoRequest getInfoRequest);

    Result getStaffList(GetStaffListRequest getStaffListRequest);

    Result approved(ApprovedRequest approvedRequest);

    Result delete(DeleteStaffRequest deleteStaffRequest);
}
