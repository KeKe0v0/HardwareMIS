package com.geek.hardwaremis_server.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.util.ObjectUtils;

import java.util.Date;

public class JwtUtils {

    public static final long EXPIRE = 1000 * 60 * 60 * 12; // token过期时间  12小时
    public static final String APP_SECRET = "ukc8BDbRigUDaY6pZFfWus2jZWLPHO"; // 加密的密钥

    // 生成token字符串
    public static String getJwtToken(String id){

        return Jwts.builder()
                // 头信息
                .setHeaderParam("typ", "JWT")
                .setHeaderParam("alg", "HS256") // 加密方式
                // 设置过期时间
                .setSubject("xxx") // 项目名
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRE))

                // 设置用户信息 可以加多个
                .claim("id", id)
                // 签名方式
                .signWith(SignatureAlgorithm.HS256, APP_SECRET)
                .compact();
    }

    // 判断token的合法性、有效期等进行判断，直接对token进行判断
    // 注意这里的异常直接交给拦截器中去处理
    public static boolean checkToken(String jwtToken) throws Exception {
        if(ObjectUtils.isEmpty(jwtToken)) return false;
        Jwts.parser().setSigningKey(APP_SECRET).parseClaimsJws(jwtToken);
        return true;
    }

    // 判断token是否存在与有效，从请求头中获取token
    public static boolean checkToken(HttpServletRequest request) {
        try {
            String jwtToken = request.getHeader("token");
            if(ObjectUtils.isEmpty(jwtToken)) return false;
            Jwts.parser().setSigningKey(APP_SECRET).parseClaimsJws(jwtToken);
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    // 根据token获取用户信息
    public static String getMemberIdByJwtToken(HttpServletRequest request) {
        String jwtToken = request.getHeader("token");
        if(ObjectUtils.isEmpty(jwtToken)) return "";
        Jws<Claims> claimsJws = Jwts.parser().setSigningKey(APP_SECRET).parseClaimsJws(jwtToken);
        Claims claims = claimsJws.getBody(); // 得到用户数据的主体
        return (String)claims.get("id");
    }

    public static String getMemberIdByJwtToken(String token) {;
        if(ObjectUtils.isEmpty(token)) return "";
        Jws<Claims> claimsJws = Jwts.parser().setSigningKey(APP_SECRET).parseClaimsJws(token);
        Claims claims = claimsJws.getBody(); // 得到用户数据的主体
        return (String)claims.get("id");
    }
}
