package com.zs.portfolio.services;

import com.zs.portfolio.dto.Quote;
import com.zs.portfolio.models.Stocks;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

public class StocksPriceUpdaterEngine {
    private HashMap<Integer, Stocks> stocksMap;
    private HashMap<Integer, Double> prices;
    private List<Quote> cashedQuotes;

    private final ReadWriteLock readWriteLock = new ReentrantReadWriteLock();
    private final Lock readLock = readWriteLock.readLock();
    private final Lock writeLock = readWriteLock.writeLock();
    private ScheduledExecutorService executor;

    public StocksPriceUpdaterEngine(HashMap<Integer, Stocks> stocksMap) {
        this.stocksMap = stocksMap;
        prices = new HashMap<Integer, Double>();
        stocksMap.forEach((k, v)->{
            prices.put(k, (Math.random() * 50) + 100);
        });
    }

    public void start(){
        startUpdater();
    }

    public void stop(){
        executor.shutdown();
    }

    public List<Quote> getQuotes() {
        readLock.lock();
        try
        {
            return cashedQuotes; }
        finally
        {
            readLock.unlock();
        }

    }

    private void startUpdater(){
        executor =
                Executors.newScheduledThreadPool(1);
        executor.scheduleAtFixedRate(
                () -> {safePriceUpdate();},
                1,
                1,
                TimeUnit.SECONDS
        );
    }


    private void safePriceUpdate(){
        List<Quote>  quotes = computeQuotes();
        writeLock.lock();
        try
        {
            cashedQuotes = quotes;
        }
        finally
        {
            writeLock.unlock();
        }
    }


    private List<Quote> computeQuotes(){
        LocalDateTime now = LocalDateTime.now();
        List<Quote> quotes =  new ArrayList<>();
        for (int k : stocksMap.keySet()) {
            Quote quote = getNewQuote(now, k);
            quotes.add(quote);
        }
        return quotes;
    }

    private Quote getNewQuote(LocalDateTime now, int k) {
        Quote quote = new Quote();
        double oldPrice = prices.get(k);
        double percent = (Math.random() - 0.5) / 10;
        percent = Math.abs(percent) < 0.02 ? 0 : percent;
        double delta = oldPrice * percent;
        double newPrice = oldPrice + delta;
        if(newPrice < 50 || newPrice > 150){
            newPrice = oldPrice - delta;
        }
        prices.put(k, newPrice);

        quote.setStockId(k);
        quote.setTimesstamp(now);
        quote.setPrice(newPrice);
        quote.setDelta(delta);
        return quote;
    }
}
