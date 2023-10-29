package com.geek.hardwaremis_server.controller;

import com.geek.hardwaremis_server.dto.*;
import com.geek.hardwaremis_server.service.PurchasingService;
import com.geek.hardwaremis_server.utils.Result;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/purchasing")
public class PurchasingController {

    @Resource
    private PurchasingService purchasingService;

    @PostMapping("/getPurchasingList")
    public Result getPurchasingList(@RequestBody GetPurchasingListRequest getPurchasingListRequest) {
        return purchasingService.getPurchasingList(getPurchasingListRequest);
    }

    @PostMapping("/newProduct")
    public Result newProduct(@RequestBody NewProductRequest newProductRequest) {
        return purchasingService.newProduct(newProductRequest);
    }

    @PostMapping("/getStockoutList")
    public Result getStockoutList(@RequestBody GetStockoutListRequest getStockoutListRequest) {
        return purchasingService.getStockoutList(getStockoutListRequest);
    }

    @PostMapping("/stockoutPurchasing")
    public Result stockoutPurchasing(@RequestBody StockoutPurchasingRequest stockoutPurchasingRequest) {
        return purchasingService.stockoutPurchasing(stockoutPurchasingRequest);
    }

    @PostMapping("/getPurchasingDetailList")
    public Result getPurchasingDetailList(@RequestBody GetPurchasingDetailListRequest getPurchasingDetailListRequest) {
        return purchasingService.getPurchasingDetailList(getPurchasingDetailListRequest);
    }

    @PostMapping("/shipment")
    public Result shipment(@RequestBody PurchasingShipmentRequest shipmentRequest) {
        return purchasingService.shipment(shipmentRequest);
    }
    @PostMapping("/received")
    public Result received(@RequestBody ReceivedRequest receivedRequest) {
        return purchasingService.received(receivedRequest);
    }


}
