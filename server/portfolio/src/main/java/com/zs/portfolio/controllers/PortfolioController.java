package com.zs.portfolio.controllers;

import com.zs.portfolio.dto.*;
import com.zs.portfolio.dto.converters.PortfolioEntryEntityDtoConverter;
import com.zs.portfolio.models.Portfolio;
import com.zs.portfolio.models.PortfolioEntries;
import com.zs.portfolio.models.Stocks;
import com.zs.portfolio.services.IPortfolioService;
import com.zs.portfolio.services.IStocksService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/portfolio")
@CrossOrigin
public class PortfolioController {

    @Autowired
    private IPortfolioService portfolioService;

    @Autowired
    private IStocksService stocksService;

    @Autowired
    private ModelMapper modelMapper;


    @PostConstruct
    public void init(){
        HashMap<Integer, Stocks> stocksMap = stocksService.getStocksMap(false);
        PortfolioEntryEntityDtoConverter converter = new PortfolioEntryEntityDtoConverter(stocksMap);
        modelMapper.addConverter(converter);
    }

    @GetMapping("{id}")
    public PortfolioDto getPortfolio(@PathVariable int id){
        Portfolio portfolio = portfolioService.getPortfolio(id);
        PortfolioDto output = modelMapper.map(portfolio, PortfolioDto.class);
        return output;
    }

    @GetMapping("/list")
    public List<PortfolioHeaderDto> listPortfolios(){
        List<Portfolio> portfolios = portfolioService.getAllPortfolios();
        if(portfolios == null) return null;
        List<PortfolioHeaderDto> output = portfolios.stream()
                .map(entity -> modelMapper.map(entity, PortfolioHeaderDto.class))
                .collect(Collectors.toList());
        return output;
    }

    @GetMapping()
    public List<Portfolio> getAllPortfolios(){
        return portfolioService.getAllPortfolios();
    }

    @PostMapping()
    public PortfolioDto createPorfolio(@RequestBody PortfolioCreateDto portfolioDto){

        Portfolio portfolio = portfolioService.createPortfolio(portfolioDto.getName(), portfolioDto.isIncludeStocks());
        PortfolioDto output = modelMapper.map(portfolio, PortfolioDto.class);

        return output;
    }

    @PostMapping("/entries/{portfolioId}")
    public void addPortfolioEntries(@PathVariable int portfolioId, @RequestBody List<Integer> stocks){
        portfolioService.addPortfolioEntries(portfolioId, stocks);
    }

    @PostMapping("/operation/{portfolioId}")
    public PortfolioEntryDto addPerformOperation(@PathVariable int portfolioId, @RequestBody OperationDto oper){
        PortfolioEntries entry = portfolioService.performOperation(portfolioId, oper.getStockId(), oper.getDelta());
        return modelMapper.map(entry, PortfolioEntryDto.class);
    }

}
