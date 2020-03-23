package com.zs.portfolio.dto;

public class PortfolioCreateDto {
    private String name;
    private boolean includeStocks;

    public boolean isIncludeStocks() {
        return includeStocks;
    }

    public void setIncludeStocks(boolean includeStocks) {
        this.includeStocks = includeStocks;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
