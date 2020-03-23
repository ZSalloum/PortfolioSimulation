package com.zs.portfolio.models;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

@Embeddable
public class OperationIdentity implements Serializable {
    @Column(name = "\"Time\"")
    private Date time;
    @Column(name = "\"PortfolioId\"")
    private int portfolioId;
    @Column(name = "\"StockId\"")
    private int stockId;


    public OperationIdentity() {

    }

    public OperationIdentity(Date time, int portfolioId, int stockId) {
        this.time = time;
        this.portfolioId = portfolioId;
        this.stockId = stockId;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public int getPortfolioId() {
        return portfolioId;
    }

    public void setPortfolioId(int portfolioId) {
        this.portfolioId = portfolioId;
    }

    public int getStockId() {
        return stockId;
    }

    public void setStockId(int stockId) {
        this.stockId = stockId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass())
            return false;

        OperationIdentity that = (OperationIdentity) o;

        return  Objects.equals(time, that.time) &&
                Objects.equals(portfolioId, that.portfolioId) &&
                Objects.equals(stockId, that.stockId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(time, portfolioId, stockId);
    }
}