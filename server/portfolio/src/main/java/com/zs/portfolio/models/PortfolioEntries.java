package com.zs.portfolio.models;

import javax.persistence.*;

@Entity()
@Table(name = "portfolio_entries", schema = "public")
public class PortfolioEntries {

    @EmbeddedId
    private PortfolioEntryIdentity portfolioEntryIdentity;

    @ManyToOne(targetEntity = Portfolio.class)
    @JoinColumn(name="\"portfolioId\"", insertable = false, updatable = false)
    Portfolio portfolio;

    public Portfolio getPortfolio() {
        return portfolio;
    }

    public void setPortfolio(Portfolio portfolio) {
        this.portfolio = portfolio;
    }
    private int quantity;


    public PortfolioEntryIdentity getPortfolioEntryIdentity() {
        return portfolioEntryIdentity;
    }

    public void setPortfolioEntryIdentity(PortfolioEntryIdentity portfolioEntryIdentity) {
        this.portfolioEntryIdentity = portfolioEntryIdentity;
    }


    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

}
