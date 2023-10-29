package com.geek.hardwaremis_server.service;

import com.geek.hardwaremis_server.dto.GetCustomerListRequest;
import com.geek.hardwaremis_server.dto.NewCustomerRequest;
import com.geek.hardwaremis_server.utils.Result;

public interface CustomerService {


    Result getCustomerList(GetCustomerListRequest getCustomerListRequest);


    Result newCustomer(NewCustomerRequest newCustomerRequest);
}
