package com.geek.hardwaremis_server.service.Impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.geek.hardwaremis_server.dto.*;
import com.geek.hardwaremis_server.entity.*;
import com.geek.hardwaremis_server.mapper.*;
import com.geek.hardwaremis_server.service.InventoryService;
import com.geek.hardwaremis_server.service.PurchasingService;
import com.geek.hardwaremis_server.service.SaleService;
import com.geek.hardwaremis_server.utils.Result;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class InventoryServiceImpl implements InventoryService {

    @Resource
    private HardwareMapper hardwareMapper;
    @Resource
    private InventoryMapper inventoryMapper;
    @Resource
    private RestockMapper restockMapper;
    @Resource
    private SaleMapper saleMapper;
    @Resource
    private SaleDetailMapper saleDetailMapper;

    @Resource
    private SaleService saleService;

    @Resource
    private PurchasingDetailMapper purchasingDetailMapper;

    @Resource
    private PurchasingService purchasingService;

    @Override
    public Result getInventoryList(GetInventoryListRequest getInventoryListRequest) {
        List<Hardware> hardwareList = hardwareMapper.selectList(null);
        Result result = Result.ok();
        List<Map<String, Object>> dataList = new ArrayList<>();
        hardwareList.forEach(item -> {
            Map<String, Object> data = new HashMap<>();
            data.put("hardwareId", item.getHardwareId());
            data.put("type", item.getType());
            data.put("model", item.getModel());
            data.put("brand", item.getBrand());
            data.put("price", item.getPrice());
            data.put("unit", item.getUnit());
            Inventory inventory = inventoryMapper.selectById(item.getHardwareId());
            data.put("inventory", inventory.getInventory());
            dataList.add(data);
        });
        result.data("inventoryList", dataList);
        return result;
    }

    @Override
    public Result restock(RestockRequest restockRequest) {
        Restock restock = new Restock();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        restock.setRestockId(sdf.format(new Date()));
        restock.setHardwareId(restockRequest.getHardwareId());
        restock.setRestockNumber(restockRequest.getRestockNumber());
        int insertResult = restockMapper.insert(restock);
        Result result;
        if (insertResult > 0) {
            result = this.getRestockList(new GetRestockListRequest());
        } else {
            result = Result.error();
        }
        return result;
    }

    @Override
    public Result getRestockList(GetRestockListRequest getRestockListRequest) {
        List<Restock> restockList = restockMapper.selectList(null);
        Result result = Result.ok();
        List<Map<String, Object>> dataList = new ArrayList<>();
        restockList.forEach(item -> {
            Map<String, Object> data = new HashMap<>();
            data.put("restockId", item.getRestockId());
            data.put("hardwareId", item.getHardwareId());
            data.put("restockNumber", item.getRestockNumber());
            data.put("status", item.getStatus() == 0 ? "待确认" : "已确认");
            dataList.add(data);
        });
        result.data("restockList", dataList);
        return result;
    }

    @Override
    public Result stockOut(StockOutRequest stockOutRequest) {
        QueryWrapper<SaleDetail> saleDetailQW = new QueryWrapper<>();
        saleDetailQW.eq("sale_id", stockOutRequest.getSaleId());
        List<SaleDetail> saleDetailList = saleDetailMapper.selectList(saleDetailQW);
        if(saleDetailList.stream().anyMatch(item -> {
            Inventory inventory = inventoryMapper.selectById(item.getHardwareId());
            return item.getSaleNumber() > inventory.getInventory();
        })) {
            return Result.error();
        }
        saleDetailList.forEach(item -> {
            Inventory inventory = inventoryMapper.selectById(item.getHardwareId());
            inventory.setInventory(inventory.getInventory() - item.getSaleNumber());
            inventoryMapper.updateById(inventory);
        });
        Sale sale = saleMapper.selectById(stockOutRequest.getSaleId());
        sale.setStatus(1);
        int updateResult = saleMapper.updateById(sale);
        if (updateResult == 0) {
            return Result.error();
        }
        GetSaleListRequest request = new GetSaleListRequest();
        request.setStaffId("02");
        return saleService.getSaleList(request);
    }

    @Override
    public Result stockIn(StockInRequest stockInRequest) {
        PurchasingDetail purchasingDetail = purchasingDetailMapper.selectById(stockInRequest.getPurchasingDetailId());
        Inventory inventory = inventoryMapper.selectById(purchasingDetail.getHardwareId());
        inventory.setInventory(inventory.getInventory() + purchasingDetail.getPurchasingNumber());
        int updateInventoryResult = inventoryMapper.updateById(inventory);
        if (updateInventoryResult == 0) {
            return Result.error();
        }
        purchasingDetail.setStatus(3);
        int updatePurchasingDetailResult = purchasingDetailMapper.updateById(purchasingDetail);
        if (updatePurchasingDetailResult == 0) {
            return Result.error();
        }
        GetPurchasingDetailListRequest getPurchasingDetailListRequest = new GetPurchasingDetailListRequest();
        getPurchasingDetailListRequest.setStaffId("02");
        return purchasingService.getPurchasingDetailList(getPurchasingDetailListRequest);
    }

    @Override
    public Result setPrice(SetPriceRequest setPriceRequest) {
        Hardware hardware = hardwareMapper.selectById(setPriceRequest.getHardwareId());
        hardware.setPrice(setPriceRequest.getPrice());
        hardware.setUnit(setPriceRequest.getUnit());
        int updateResult = hardwareMapper.updateById(hardware);
        if (updateResult == 0) {
            return Result.error();
        }
        return this.getInventoryList(new GetInventoryListRequest());
    }
}
