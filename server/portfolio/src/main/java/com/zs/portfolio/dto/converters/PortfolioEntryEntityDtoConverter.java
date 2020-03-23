package com.zs.portfolio.dto.converters;

import com.zs.portfolio.dto.PortfolioEntryDto;
import com.zs.portfolio.models.PortfolioEntries;
import com.zs.portfolio.models.Stocks;
import org.modelmapper.AbstractConverter;
import org.modelmapper.Converter;
import org.modelmapper.spi.MappingContext;

import java.util.HashMap;

public class PortfolioEntryEntityDtoConverter implements Converter<PortfolioEntries, PortfolioEntryDto> {

    private HashMap<Integer, Stocks> stocks;
    public PortfolioEntryEntityDtoConverter(HashMap<Integer, Stocks> stocks){
        this.stocks = stocks;
    }
    @Override
    public PortfolioEntryDto convert(MappingContext<PortfolioEntries, PortfolioEntryDto> ctx) {
        PortfolioEntryDto dto = ctx.getMappingEngine().createDestination(ctx);
        PortfolioEntries entry = ctx.getSource();

        dto.setPortfolioId(entry.getPortfolioEntryIdentity().getPortfolioId());
        dto.setStockId(entry.getPortfolioEntryIdentity().getStockId());
        dto.setQuantity(entry.getQuantity());

        Integer id = Integer.valueOf( dto.getStockId());
        if(stocks!=null && stocks.containsKey(id)){
            dto.setName(stocks.get(id).getName());
        }
        return dto;
    }
}
