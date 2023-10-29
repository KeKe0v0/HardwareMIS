package com.geek.hardwaremis_server.service.Impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.geek.hardwaremis_server.dto.*;
import com.geek.hardwaremis_server.entity.*;
import com.geek.hardwaremis_server.mapper.*;
import com.geek.hardwaremis_server.service.PurchasingService;
import com.geek.hardwaremis_server.utils.Result;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class PurchasingServiceImpl implements PurchasingService {

    @Resource
    private PurchasingMapper purchasingMapper;

    @Resource
    private PurchasingDetailMapper purchasingDetailMapper;

    @Resource
    private SupplierMapper supplierMapper;

    @Resource
    private InventoryMapper inventoryMapper;

    @Resource
    private HardwareMapper hardwareMapper;

    @Resource
    private RestockMapper restockMapper;


    @Override
    public Result getPurchasingList(GetPurchasingListRequest getPurchasingListRequest) {
        QueryWrapper<Purchasing> queryWrapper = new QueryWrapper<>();
        if(getPurchasingListRequest.getStaffId() != null) {
            if(getPurchasingListRequest.getStaffId().startsWith("03")) {
                queryWrapper.eq("staff_id", getPurchasingListRequest.getStaffId());
            }
        }
        List<Purchasing> purchasingList = purchasingMapper.selectList(queryWrapper);
        Result result = Result.ok();
        List<Map<String, Object>> dataList = new ArrayList<>();
        purchasingList.forEach(item -> {
            Map<String, Object> data = new HashMap<>();
            data.put("purchasingId", item.getPurchasingId());
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
            data.put("orderTime", sdf.format(item.getOrderTime()));
            Supplier supplier = supplierMapper.selectById(item.getSupplierId());
            data.put("supplier", supplier.getName());
            dataList.add(data);
        });
        result.data("purchasingList", dataList);
        return result;
    }

    @Override
    public Result newProduct(NewProductRequest newProductRequest) {
        Purchasing purchasing = new Purchasing();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        Date current = new Date();
        purchasing.setPurchasingId(sdf.format(current));
        purchasing.setOrderTime(current);
        purchasing.setStaffId(newProductRequest.getStaffId());
        purchasing.setSupplierId(newProductRequest.getSupplierId());
        int insertResult = purchasingMapper.insert(purchasing);
        if (insertResult == 0) {
            return Result.error();
        }
        List<NewProductDetailRequest> newProductDetailRequestList = newProductRequest.getNewProductDetail();
        int count = 0;
        for (NewProductDetailRequest request : newProductDetailRequestList) {
            count++;
            String hardwareId = purchasing.getPurchasingId().substring(0, purchasing.getPurchasingId().length() - 1) + count;
            PurchasingDetail purchasingDetail = new PurchasingDetail();
            purchasingDetail.setPurchasingDetailId(purchasing.getPurchasingId() + String.format("%02d", count));
            purchasingDetail.setPurchasingId(purchasing.getPurchasingId());
            purchasingDetail.setHardwareId(hardwareId);
            purchasingDetail.setPurchasingPrice(request.getPurchasingPrice());
            purchasingDetail.setPurchasingNumber(request.getPurchasingNumber());
            int insertDetailResult = purchasingDetailMapper.insert(purchasingDetail);
            if (insertDetailResult == 0) {
                return Result.error();
            }
            Hardware hardware = new Hardware();
            hardware.setHardwareId(hardwareId);
            hardware.setType(request.getType());
            hardware.setModel(request.getModel());
            hardware.setBrand(request.getBrand());
            int insertHardwareResult = hardwareMapper.insert(hardware);
            if (insertHardwareResult == 0) {
                return Result.error();
            }
            Inventory inventory = new Inventory();
            inventory.setHardwareId(hardwareId);
            inventory.setInventory(0);
            int insertInventoryResult = inventoryMapper.insert(inventory);
            if (insertInventoryResult == 0) {
                return Result.error();
            }
        }
        GetPurchasingListRequest request = new GetPurchasingListRequest();
        request.setStaffId(newProductRequest.getStaffId());
        return this.getPurchasingList(request);
    }

    @Override
    public Result getStockoutList(GetStockoutListRequest getStockoutListRequest) {
        QueryWrapper<Restock> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("status", 0);
        List<Restock> restockList = restockMapper.selectList(queryWrapper);
        Result result = Result.ok();
        List<Map<String, Object>> dataList = new ArrayList<>();
        restockList.forEach(item -> {
            Map<String, Object> data = new HashMap<>();
            data.put("restockId", item.getRestockId());
            data.put("hardwareId", item.getHardwareId());
            Hardware hardware = hardwareMapper.selectById(item.getHardwareId());
            data.put("type", hardware.getType());
            data.put("model", hardware.getModel());
            data.put("brand", hardware.getBrand());
            data.put("restockNumber", item.getRestockNumber());
            dataList.add(data);
        });
        result.data("restockList", dataList);
        return result;
    }

    @Override
    public Result stockoutPurchasing(StockoutPurchasingRequest stockoutPurchasingRequest) {
        Purchasing purchasing = new Purchasing();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        Date current = new Date();
        purchasing.setPurchasingId(sdf.format(current));
        purchasing.setOrderTime(current);
        purchasing.setStaffId(stockoutPurchasingRequest.getStaffId());
        purchasing.setSupplierId(stockoutPurchasingRequest.getSupplierId());
        int insertResult = purchasingMapper.insert(purchasing);
        if (insertResult == 0) {
            return Result.error();
        }
        List<StockoutPurchasingListRequest> stockoutPurchasingList = stockoutPurchasingRequest.getStockoutPurchasingList();
        int count = 0;
        for (StockoutPurchasingListRequest request : stockoutPurchasingList) {
            count++;
            String hardwareId = purchasing.getPurchasingId().substring(0, purchasing.getPurchasingId().length() - 1) + count;
            PurchasingDetail purchasingDetail = new PurchasingDetail();
            purchasingDetail.setPurchasingDetailId(purchasing.getPurchasingId() + String.format("%02d", count));
            purchasingDetail.setPurchasingId(purchasing.getPurchasingId());
            purchasingDetail.setHardwareId(hardwareId);
            purchasingDetail.setPurchasingPrice(request.getPurchasingPrice());
            purchasingDetail.setPurchasingNumber(request.getRestockNumber());
            int insertDetailResult = purchasingDetailMapper.insert(purchasingDetail);
            if (insertDetailResult == 0) {
                return Result.error();
            }
        }
        List<String> restockIdList = stockoutPurchasingRequest.getRestockIdList();
        restockIdList.forEach(item -> {
            Restock restock = restockMapper.selectById(item);
            restock.setStatus(1);
            restockMapper.updateById(restock);
        });
        GetPurchasingListRequest request = new GetPurchasingListRequest();
        request.setStaffId(stockoutPurchasingRequest.getStaffId());
        return this.getPurchasingList(request);
    }

    @Override
    public Result getPurchasingDetailList(GetPurchasingDetailListRequest getPurchasingDetailListRequest) {
        QueryWrapper<PurchasingDetail> queryWrapper = new QueryWrapper<>();
        if(getPurchasingDetailListRequest.getStaffId() != null) {
            if(getPurchasingDetailListRequest.getStaffId().startsWith("03")) {
                queryWrapper.eq("purchasing_id",getPurchasingDetailListRequest.getPurchasingId());
            }
            if(getPurchasingDetailListRequest.getStaffId().startsWith("02")) {
                queryWrapper.eq("status",2);
            }
        }
        List<PurchasingDetail> purchasingDetailList = purchasingDetailMapper.selectList(queryWrapper);
        Result result = Result.ok();
        List<Map<String, Object>> dataList = new ArrayList<>();
        purchasingDetailList.forEach(item -> {
            Map<String, Object> data = new HashMap<>();
            data.put("purchasingDetailId", item.getPurchasingDetailId());
            data.put("purchasingId", item.getPurchasingId());
            data.put("hardwareId", item.getHardwareId());
            data.put("purchasingPrice", item.getPurchasingPrice());
            data.put("purchasingNumber", item.getPurchasingNumber());
            if(item.getShippingTime() != null) {
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
                data.put("shippingTime", sdf.format(item.getShippingTime()));
            }
            data.put("trackingNumber", item.getTrackingNumber());
            data.put("status", item.getStatus() == 0 ? "待发货" : item.getStatus() == 1 ? "待收货" : item.getStatus() == 2 ? "待入库" : "已入库");
            dataList.add(data);
        });

        result.data("purchasingDetailList", dataList);
        return result;
    }

    @Override
    public Result shipment(PurchasingShipmentRequest shipmentRequest) {
        PurchasingDetail purchasingDetail = purchasingDetailMapper.selectById(shipmentRequest.getPurchasingDetailId());
        purchasingDetail.setShippingTime(new Date());
        purchasingDetail.setTrackingNumber(shipmentRequest.getTrackingNumber());
        purchasingDetail.setStatus(1);
        int updateResult = purchasingDetailMapper.updateById(purchasingDetail);
        if (updateResult == 0) {
            return Result.error();
        }
        GetPurchasingDetailListRequest request = new GetPurchasingDetailListRequest();
        request.setPurchasingId(purchasingDetail.getPurchasingId());
        return this.getPurchasingDetailList(request);
    }

    @Override
    public Result received(ReceivedRequest receivedRequest) {
        PurchasingDetail purchasingDetail = purchasingDetailMapper.selectById(receivedRequest.getPurchasingDetailId());
        purchasingDetail.setStatus(2);
        int updateResult = purchasingDetailMapper.updateById(purchasingDetail);
        if (updateResult == 0) {
            return Result.error();
        }
        GetPurchasingDetailListRequest request = new GetPurchasingDetailListRequest();
        request.setPurchasingId(purchasingDetail.getPurchasingId());
        return this.getPurchasingDetailList(request);
    }
}
