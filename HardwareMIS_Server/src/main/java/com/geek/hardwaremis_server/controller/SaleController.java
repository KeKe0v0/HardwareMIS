package com.geek.hardwaremis_server.controller;

import com.geek.hardwaremis_server.dto.*;
import com.geek.hardwaremis_server.service.SaleService;
import com.geek.hardwaremis_server.utils.Result;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sale")
public class SaleController {

    @Resource
    private SaleService saleService;

    @PostMapping("/getSaleList")
    public Result getSaleList(@RequestBody GetSaleListRequest getSaleListRequest) {
        return saleService.getSaleList(getSaleListRequest);
    }

    @PostMapping("/getSaleDetail")
    public Result getSaleDetail(@RequestBody GetSaleDetailRequest getSaleDetailRequest) {
        return saleService.getSaleDetail(getSaleDetailRequest);
    }

    @PostMapping("/newSaleOrder")
    public Result newSaleOrder(@RequestBody NewSaleOrderRequest newSaleOrderRequest) {
        return saleService.newSaleOrder(newSaleOrderRequest);
    }

    @PostMapping("/shipment")
    public Result shipment(@RequestBody ShipmentRequest shipmentRequest) {
        return saleService.shipment(shipmentRequest);
    }



}
