package com.geek.hardwaremis_server.utils;

import lombok.Data;

import java.util.HashMap;
import java.util.Map;

@Data
public class Result {

    private Boolean success;

    private Integer code;

    private String message;

    private Map<String, Object> data = new HashMap<>();

    public static Result ok() {
        Result r = new Result();
        r.setSuccess(true);
        r.setCode(ResultCode.SUCCESS);
        r.setMessage("成功");
        return r;
    }

    public static Result error() {
        Result r = new Result();
        r.setSuccess(false);
        r.setCode(ResultCode.ERROR);
        r.setMessage("失败");
        return r;
    }

    public Result data(String key, Object value) {
        this.data.put(key, value);
        return this;
    }

}
