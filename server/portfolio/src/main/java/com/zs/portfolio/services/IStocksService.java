package com.zs.portfolio.services;

import com.zs.portfolio.dto.Quote;
import com.zs.portfolio.models.Stocks;

import java.util.HashMap;
import java.util.List;

public interface IStocksService {
    HashMap<Integer, Stocks> getStocksMap(boolean refresh);

    List<Quote> getQuotes();
}
