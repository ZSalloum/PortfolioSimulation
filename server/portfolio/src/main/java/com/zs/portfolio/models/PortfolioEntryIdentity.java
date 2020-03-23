package com.zs.portfolio.models;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;

@Embeddable
public class PortfolioEntryIdentity implements Serializable {

    private int portfolioId;

    private int stockId;

    public PortfolioEntryIdentity(){}

    public PortfolioEntryIdentity(int portfolioId, int stockId) {
        this.portfolioId = portfolioId;
        this.stockId = stockId;
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

        PortfolioEntryIdentity that = (PortfolioEntryIdentity) o;
        return Objects.equals(portfolioId, that.portfolioId) &&
                Objects.equals(stockId, that.stockId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(portfolioId, stockId);
    }
}
