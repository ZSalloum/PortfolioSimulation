package com.zs.portfolio.dto;

import java.time.LocalDateTime;
import java.util.Date;

public class Quote {

    private LocalDateTime timesstamp;
    private int stockId;
    private double price;
    private double delta;

    public LocalDateTime getTimesstamp() {
        return timesstamp;
    }

    public void setTimesstamp(LocalDateTime timesstamp) {
        this.timesstamp = timesstamp;
    }

    public int getStockId() {
        return stockId;
    }

    public void setStockId(int stockId) {
        this.stockId = stockId;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getDelta() {
        return delta;
    }

    public void setDelta(double delta) {
        this.delta = delta;
    }
}
