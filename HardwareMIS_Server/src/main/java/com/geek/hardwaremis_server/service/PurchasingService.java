package com.geek.hardwaremis_server.service;

import com.geek.hardwaremis_server.dto.*;
import com.geek.hardwaremis_server.utils.Result;

public interface PurchasingService {


    Result getPurchasingList(GetPurchasingListRequest getPurchasingListRequest);

    Result newProduct(NewProductRequest newProductRequest);

    Result getStockoutList(GetStockoutListRequest getStockoutListRequest);

    Result stockoutPurchasing(StockoutPurchasingRequest stockoutPurchasingRequest);

    Result getPurchasingDetailList(GetPurchasingDetailListRequest getPurchasingDetailListRequest);

    Result shipment(PurchasingShipmentRequest shipmentRequest);

    Result received(ReceivedRequest receivedRequest);
}
