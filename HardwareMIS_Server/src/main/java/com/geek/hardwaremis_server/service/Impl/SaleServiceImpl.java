package com.geek.hardwaremis_server.service.Impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.geek.hardwaremis_server.dto.*;
import com.geek.hardwaremis_server.entity.*;
import com.geek.hardwaremis_server.mapper.*;
import com.geek.hardwaremis_server.service.SaleService;
import com.geek.hardwaremis_server.utils.Result;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class SaleServiceImpl implements SaleService {

    @Resource
    private SaleMapper saleMapper;
    @Resource
    private SaleDetailMapper saleDetailMapper;
    @Resource
    private CustomerMapper customerMapper;

    @Override
    public Result getSaleList(GetSaleListRequest getSaleListRequest) {
        QueryWrapper<Sale> queryWrapper = new QueryWrapper<>();
        if(getSaleListRequest.getStaffId() != null) {
            if(getSaleListRequest.getStaffId().startsWith("01")) {
                queryWrapper.eq("staff_id", getSaleListRequest.getStaffId());
            }
            if(getSaleListRequest.getStaffId().startsWith("02")) {
                queryWrapper.eq("status", 0);
            }
        }
        List<Sale> saleList = saleMapper.selectList(queryWrapper);
        Result result = Result.ok();
        List<Map<String, Object>> dataList = new ArrayList<>();
        saleList.forEach(item -> {
            Map<String, Object> data = new HashMap<>();
            data.put("saleId", item.getSaleId());
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
            data.put("orderTime", sdf.format(item.getOrderTime()));
            Customer customer = customerMapper.selectById(item.getCustomerId());
            data.put("recipient", customer.getName());
            data.put("telephone", customer.getTelephone());
            data.put("address", customer.getAddress());
            if(item.getShippingTime() != null) {
                data.put("shippingTime", sdf.format(item.getShippingTime()));
            }
            data.put("trackingNumber", item.getTrackingNumber());
            data.put("status", item.getStatus() == 0 ? "待出库" : item.getStatus() == 1 ? "待发货" : "已发货");
            dataList.add(data);
        });
        result.data("saleList", dataList);
        return result;
    }

    @Override
    public Result getSaleDetail(GetSaleDetailRequest getSaleDetailRequest) {
        QueryWrapper<SaleDetail> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("sale_id",getSaleDetailRequest.getSaleId());
        List<SaleDetail> saleDetailList = saleDetailMapper.selectList(queryWrapper);
        Result result = Result.ok();
        result.data("saleDetailList", saleDetailList);
        return result;
    }

    @Override
    public Result newSaleOrder(NewSaleOrderRequest newSaleOrderRequest) {
        Sale sale = new Sale();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        Date current = new Date();
        sale.setSaleId(sdf.format(current));
        sale.setOrderTime(current);
        sale.setStaffId(newSaleOrderRequest.getStaffId());
        sale.setCustomerId(newSaleOrderRequest.getCustomerId());
        int insertResult = saleMapper.insert(sale);
        if (insertResult == 0) {
            return Result.error();
        }
        List<NewSaleOrderDetailRequest> saleOrderDetailRequestList = newSaleOrderRequest.getSaleDetail();
        int count = 0;
        for (NewSaleOrderDetailRequest request : saleOrderDetailRequestList) {
            count++;
            SaleDetail saleDetail = new SaleDetail();
            saleDetail.setSaleDetailId(sale.getSaleId() + String.format("%02d", count));
            saleDetail.setSaleId(sale.getSaleId());
            saleDetail.setHardwareId(request.getHardwareId());
            saleDetail.setSalePrice(request.getSalePrice());
            saleDetail.setSaleNumber(request.getSaleNumber());
            int insertDetailResult = saleDetailMapper.insert(saleDetail);
            if (insertDetailResult == 0) {
                return Result.error();
            }
        }
        GetSaleListRequest request = new GetSaleListRequest();
        request.setStaffId(newSaleOrderRequest.getStaffId());
        return this.getSaleList(request);
    }

    @Override
    public Result shipment(ShipmentRequest shipmentRequest) {
        Sale sale = saleMapper.selectById(shipmentRequest.getSaleId());
        sale.setShippingTime(new Date());
        sale.setTrackingNumber(shipmentRequest.getTrackingNumber());
        sale.setStatus(2);
        int updateResult = saleMapper.updateById(sale);
        if (updateResult == 0) {
            return Result.error();
        }
        return this.getSaleList(new GetSaleListRequest());
    }
}
