package com.zs.portfolio.services;

import com.zs.portfolio.dao.StocksRepository;
import com.zs.portfolio.dto.Quote;
import com.zs.portfolio.models.Stocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.List;

@Service
public class StocksService implements IStocksService {

    @Autowired
    private StocksRepository stocksRepository;

    private StocksPriceUpdaterEngine updaterEngine;

    private HashMap<Integer, Stocks> stocksMap;

    public StocksService() {

    }

    @PostConstruct
    public void init(){
        getStocksMap(true);
        updaterEngine = new StocksPriceUpdaterEngine(stocksMap);
        updaterEngine.start();
    }

    @Override
    public HashMap<Integer, Stocks> getStocksMap(boolean refresh){
        if(refresh || stocksMap == null){
            stocksMap = loadAndMapStocks();
        }

        return (HashMap<Integer, Stocks>)stocksMap.clone();
    }

    @Override
    public List<Quote> getQuotes(){
        return updaterEngine.getQuotes();
    }

    private HashMap<Integer, Stocks> loadAndMapStocks(){
        List<Stocks> lst = stocksRepository.findAll();
        HashMap<Integer, Stocks> tmpMap = new HashMap<Integer, Stocks>();
        for(int i = 0; i < lst.size(); i++){
            Stocks st = lst.get(i);
            tmpMap.put(Integer.valueOf(st.getId()), st);
        }
        return tmpMap;
    }


}
