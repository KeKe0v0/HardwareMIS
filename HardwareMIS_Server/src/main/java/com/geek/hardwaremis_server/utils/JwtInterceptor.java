package com.geek.hardwaremis_server.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import jakarta.annotation.Nonnull;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.HandlerInterceptor;


import java.util.HashMap;
import java.util.Map;

public class JwtInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, @Nonnull HttpServletResponse response, @Nonnull Object handler) throws Exception {
        if(request.getMethod().equalsIgnoreCase("OPTIONS")){
            return true; // 通过所有OPTION请求
        } else {
            String token = request.getHeader("token"); // 获取请求头中的token
            Map<String, Object> map = new HashMap<>();
            try {
                return JwtUtils.checkToken(token);
            } catch (SignatureException e) {
                map.put("msg", "无效签名");
            } catch (UnsupportedJwtException e) {
                map.put("msg", "不支持的签名");
            } catch (ExpiredJwtException e) {
                map.put("msg", "token过期");
            } catch (MalformedJwtException e) { // IllegalArgumentException
                map.put("msg", "不支持的签名格式");
            } catch (Exception e) {
                map.put("msg", "token无效");
            }
            map.put("state", false);
            // 将map转为json
            String json = new ObjectMapper().writeValueAsString(map);
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().println(json);
            return false;
        }
    }
}
