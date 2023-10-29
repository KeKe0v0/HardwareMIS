package com.geek.hardwaremis_server.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.geek.hardwaremis_server.entity.Inventory;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface InventoryMapper extends BaseMapper<Inventory> {
}
