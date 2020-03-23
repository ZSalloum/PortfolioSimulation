package com.zs.portfolio.controllers;

import com.zs.portfolio.dto.PortfolioHeaderDto;
import com.zs.portfolio.dto.Quote;
import com.zs.portfolio.dto.StockDto;
import com.zs.portfolio.dto.converters.PortfolioEntryEntityDtoConverter;
import com.zs.portfolio.models.Stocks;
import com.zs.portfolio.services.IStocksService;
import com.zs.portfolio.services.StocksService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/quotes")
@CrossOrigin
public class QuotesController {

    @Autowired
    private IStocksService stocksService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping()
    public List<Quote> getQuotes() {
        return stocksService.getQuotes();
    }

    @GetMapping("stocks")
    public List<StockDto> listStocks(){
        Collection<Stocks> stocks = stocksService.getStocksMap(false).values();
        List<StockDto> output = stocks.stream()
                .map(st -> modelMapper.map(st, StockDto.class))
                .collect(Collectors.toList());
        return output;
    }

}
