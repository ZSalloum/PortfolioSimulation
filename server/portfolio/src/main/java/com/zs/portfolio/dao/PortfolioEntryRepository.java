package com.zs.portfolio.dao;


import com.zs.portfolio.models.Portfolio;
import com.zs.portfolio.models.PortfolioEntries;
import com.zs.portfolio.models.PortfolioEntryIdentity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PortfolioEntryRepository extends JpaRepository<PortfolioEntries, PortfolioEntryIdentity> {
}
