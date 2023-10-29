package com.geek.hardwaremis_server.controller;

import com.geek.hardwaremis_server.dto.GetSupplierListRequest;
import com.geek.hardwaremis_server.dto.NewSupplierRequest;
import com.geek.hardwaremis_server.service.SupplierService;
import com.geek.hardwaremis_server.utils.Result;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/supplier")
public class SupplierController {

    @Resource
    private SupplierService supplierService;

    @PostMapping("/getSupplierList")
    public Result getSupplierList(@RequestBody GetSupplierListRequest getSupplierListRequest) {
        return supplierService.getSupplierList(getSupplierListRequest);
    }

    @PostMapping("/newSupplier")
    public Result newSupplier(@RequestBody NewSupplierRequest newSupplierRequest) {
        return supplierService.newSupplier(newSupplierRequest);
    }

}
