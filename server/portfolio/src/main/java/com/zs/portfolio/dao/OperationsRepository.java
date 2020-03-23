package com.zs.portfolio.dao;

import com.zs.portfolio.models.OperationIdentity;
import com.zs.portfolio.models.Operations;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OperationsRepository extends JpaRepository<Operations, OperationIdentity> {
}
