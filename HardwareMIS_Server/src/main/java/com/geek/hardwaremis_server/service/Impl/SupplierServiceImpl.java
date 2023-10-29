package com.geek.hardwaremis_server.service.Impl;

import com.geek.hardwaremis_server.dto.*;
import com.geek.hardwaremis_server.entity.Supplier;
import com.geek.hardwaremis_server.mapper.SupplierMapper;
import com.geek.hardwaremis_server.service.SupplierService;
import com.geek.hardwaremis_server.utils.Result;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class SupplierServiceImpl implements SupplierService {

    @Resource
    private SupplierMapper supplierMapper;


    @Override
    public Result getSupplierList(GetSupplierListRequest getSupplierListRequest) {
        List<Supplier> supplierList = supplierMapper.selectList(null);
        Result result = Result.ok();
        result.data("supplierList", supplierList);
        return result;
    }

    @Override
    public Result newSupplier(NewSupplierRequest newSupplierRequest) {
        Supplier supplier = new Supplier();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        supplier.setSupplierId(sdf.format(new Date()));
        supplier.setName(newSupplierRequest.getName());
        supplier.setLinkman(newSupplierRequest.getLinkman());
        supplier.setTelephone(newSupplierRequest.getTelephone());
        supplier.setAddress(newSupplierRequest.getAddress());
        int insertResult = supplierMapper.insert(supplier);
        Result result;
        if (insertResult > 0) {
            result = this.getSupplierList(new GetSupplierListRequest());
        } else {
            result = Result.error();
        }
        return result;
    }

}
