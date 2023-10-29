package com.geek.hardwaremis_server.controller;

import com.geek.hardwaremis_server.dto.*;
import com.geek.hardwaremis_server.service.InventoryService;
import com.geek.hardwaremis_server.utils.Result;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    @Resource
    private InventoryService inventoryService;

    @PostMapping("/getInventoryList")
    public Result getInventoryList(@RequestBody GetInventoryListRequest getInventoryListRequest) {
        return inventoryService.getInventoryList(getInventoryListRequest);
    }

    @PostMapping("/restock")
    public Result restock(@RequestBody RestockRequest restockRequest) {
        return inventoryService.restock(restockRequest);
    }

    @PostMapping("/getRestockList")
    public Result getRestockList(@RequestBody GetRestockListRequest getRestockListRequest) {
        return inventoryService.getRestockList(getRestockListRequest);
    }

    @PostMapping("/stockOut")
    public Result stockOut(@RequestBody StockOutRequest stockOutRequest) {
        return inventoryService.stockOut(stockOutRequest);
    }

    @PostMapping("/stockIn")
    public Result stockIn(@RequestBody StockInRequest stockInRequest) {
        return inventoryService.stockIn(stockInRequest);
    }

    @PostMapping("/setPrice")
    public Result setPrice(@RequestBody SetPriceRequest setPriceRequest) {
        return inventoryService.setPrice(setPriceRequest);
    }

}
