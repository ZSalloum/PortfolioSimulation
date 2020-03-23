package com.zs.portfolio.models;

import javax.persistence.*;
import java.util.List;

@Entity()
public class Portfolio {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "id_seq")
    private int id;

    private String name;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name="\"portfolioId\"")
    private List<PortfolioEntries> entries;

        public List<PortfolioEntries> getEntries() {
        return entries;
    }

    public void setEntries(List<PortfolioEntries> entries) {
        this.entries = entries;
    }

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


}
