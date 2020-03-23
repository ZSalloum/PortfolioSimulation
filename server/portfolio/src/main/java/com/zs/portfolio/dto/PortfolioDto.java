package com.zs.portfolio.dto;

import com.zs.portfolio.models.PortfolioEntries;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import java.util.List;

public class PortfolioDto {
    private int id;
    private String name;
    private List<PortfolioEntryDto> entries;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<PortfolioEntryDto> getEntries() {
        return entries;
    }

    public void setEntries(List<PortfolioEntryDto> entries) {
        this.entries = entries;
    }
}
