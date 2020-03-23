package com.zs.portfolio.services;

import com.zs.portfolio.dao.PortfolioEntryRepository;
import com.zs.portfolio.dao.PortfolioRepository;
import com.zs.portfolio.models.Portfolio;
import com.zs.portfolio.models.PortfolioEntries;
import com.zs.portfolio.models.PortfolioEntryIdentity;
import com.zs.portfolio.models.Stocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.sound.sampled.Port;
import java.util.*;


@Service
public class PortfolioService implements IPortfolioService {

    @Autowired
    private PortfolioRepository portfolioRepository;

    @Autowired
    private PortfolioEntryRepository portfolioEntryRepository;

    @Autowired
    private StocksService stocksService;


    @Override
    public Portfolio getPortfolio(int portfolioId) {
        Optional<Portfolio>  optionalPortfolio = portfolioRepository.findById(portfolioId);
        if(optionalPortfolio.isPresent()){
            Portfolio portfolio = optionalPortfolio.get();
            List<PortfolioEntries> entries = portfolio.getEntries();
            entries.sort(Comparator.comparingInt(o -> o.getPortfolioEntryIdentity().getStockId()));
            portfolio.setEntries(entries);
            return  portfolio;
        }
        return null;
    }

    @Override
    public List<Portfolio> getAllPortfolios() {
        return portfolioRepository.findAll();
    }


    @Override
    public Portfolio createPortfolio(String name, boolean includeStocks) {
        Portfolio portfolio = new Portfolio();
        portfolio.setName(name);

        if(includeStocks){
            populateStocks(portfolio);
        }

        portfolio = portfolioRepository.save(portfolio);

        return portfolio;
    }

    @Override
    public void addPortfolioEntries(int portfolioId, List<Integer> stocks){
        List<PortfolioEntries> entries = new ArrayList<>();
        for (int stockId: stocks) {
            PortfolioEntryIdentity eid = new PortfolioEntryIdentity(portfolioId, stockId);
            PortfolioEntries entry = new PortfolioEntries();
            entry.setPortfolioEntryIdentity(eid);
            entries.add(entry);
        }
        portfolioEntryRepository.saveAll(entries);
    }

    public PortfolioEntries performOperation(int portfolioId, int stockId, int delta){
        Optional<PortfolioEntries> option = portfolioEntryRepository.findById(new PortfolioEntryIdentity(portfolioId, stockId));
        if(option.isPresent()){
            PortfolioEntries entry = option.get();
            entry.setQuantity(entry.getQuantity() + delta);
            return portfolioEntryRepository.save(entry);
        }

        return null;
    }


    private void populateStocks(Portfolio portfolio){
        HashMap<Integer, Stocks> map = stocksService.getStocksMap(true);
        List<PortfolioEntries> entries = new ArrayList<PortfolioEntries>();

        for (Stocks stock: map.values() ) {
            PortfolioEntries e = new PortfolioEntries();
            e.setPortfolioEntryIdentity(new PortfolioEntryIdentity(portfolio.getId(), stock.getId()));
            entries.add(e);
        }

        portfolio.setEntries(entries);
    }
}
