package com.geek.hardwaremis_server.service.Impl;

import com.geek.hardwaremis_server.dto.*;
import com.geek.hardwaremis_server.entity.Customer;
import com.geek.hardwaremis_server.mapper.CustomerMapper;
import com.geek.hardwaremis_server.service.CustomerService;
import com.geek.hardwaremis_server.utils.Result;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Resource
    private CustomerMapper customerMapper;


    @Override
    public Result getCustomerList(GetCustomerListRequest getCustomerListRequest) {
        List<Customer> customerList = customerMapper.selectList(null);
        Result result = Result.ok();
        result.data("customerList", customerList);
        return result;
    }

    @Override
    public Result newCustomer(NewCustomerRequest newCustomerRequest) {
        Customer customer = new Customer();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        customer.setCustomerId(sdf.format(new Date()));
        customer.setName(newCustomerRequest.getName());
        customer.setTelephone(newCustomerRequest.getTelephone());
        customer.setAddress(newCustomerRequest.getAddress());
        customer.setEmail(newCustomerRequest.getEmail());
        int insertResult = customerMapper.insert(customer);
        Result result;
        if (insertResult > 0) {
            result = this.getCustomerList(new GetCustomerListRequest());
        } else {
            result = Result.error();
        }
        return result;
    }
}
