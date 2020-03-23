package com.zs.portfolio.models;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "\"Operations\"", schema = "public")
public class Operations {

    @EmbeddedId
    private OperationIdentity operationIdentity;

    @Column(name = "\"Quantity\"")
    private int quantity;

    @Column(name = "\"UnitPrice\"")
    private double unitPrice;

    public OperationIdentity getOperationIdentity() {
        return operationIdentity;
    }

    public void setOperationIdentity(OperationIdentity operationIdentity) {
        this.operationIdentity = operationIdentity;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(double unitPrice) {
        this.unitPrice = unitPrice;
    }
}
