package com.zs.portfolio.dao;

import com.zs.portfolio.models.Stocks;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StocksRepository extends JpaRepository<Stocks, Integer> {
}
