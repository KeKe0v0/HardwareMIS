package com.geek.hardwaremis_server.service;

import com.geek.hardwaremis_server.dto.*;
import com.geek.hardwaremis_server.utils.Result;

public interface InventoryService {


    Result getInventoryList(GetInventoryListRequest getInventoryListRequest);

    Result restock(RestockRequest restockRequest);

    Result getRestockList(GetRestockListRequest getRestockListRequest);

    Result stockOut(StockOutRequest stockOutRequest);

    Result stockIn(StockInRequest stockInRequest);

    Result setPrice(SetPriceRequest setPriceRequest);
}
