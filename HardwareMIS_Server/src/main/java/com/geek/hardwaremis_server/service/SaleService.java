package com.geek.hardwaremis_server.service;

import com.geek.hardwaremis_server.dto.*;
import com.geek.hardwaremis_server.utils.Result;

public interface SaleService {


    Result getSaleList(GetSaleListRequest getSaleListRequest);

    Result getSaleDetail(GetSaleDetailRequest getSaleDetailRequest);

    Result newSaleOrder(NewSaleOrderRequest newSaleOrderRequest);

    Result shipment(ShipmentRequest shipmentRequest);
}
