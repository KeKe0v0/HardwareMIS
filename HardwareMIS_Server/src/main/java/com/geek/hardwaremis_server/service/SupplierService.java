package com.geek.hardwaremis_server.service;

import com.geek.hardwaremis_server.dto.GetSupplierListRequest;
import com.geek.hardwaremis_server.dto.NewSupplierRequest;
import com.geek.hardwaremis_server.utils.Result;

public interface SupplierService {


    Result getSupplierList(GetSupplierListRequest getSupplierListRequest);

    Result newSupplier(NewSupplierRequest newSupplierRequest);
}
