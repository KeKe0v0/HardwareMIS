package com.geek.hardwaremis_server.controller;

import com.geek.hardwaremis_server.dto.GetCustomerListRequest;
import com.geek.hardwaremis_server.dto.NewCustomerRequest;
import com.geek.hardwaremis_server.service.CustomerService;
import com.geek.hardwaremis_server.utils.Result;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    @Resource
    private CustomerService customerService;

    @PostMapping("/getCustomerList")
    public Result getCustomerList(@RequestBody GetCustomerListRequest getCustomerListRequest) {
        return customerService.getCustomerList(getCustomerListRequest);
    }

    @PostMapping("/newCustomer")
    public Result newCustomer(@RequestBody NewCustomerRequest newCustomerRequest) {
        return customerService.newCustomer(newCustomerRequest);
    }

}
