package com.zs.portfolio.services;

import com.zs.portfolio.models.Portfolio;
import com.zs.portfolio.models.PortfolioEntries;

import java.util.List;

public interface IPortfolioService {
    Portfolio getPortfolio(int portfolioId);

    List<Portfolio> getAllPortfolios();

    Portfolio createPortfolio(String name, boolean includeStocks);

    void addPortfolioEntries(int portfolioId, List<Integer> stocks);

    PortfolioEntries performOperation(int portfolioId, int stockId, int delta);
}
