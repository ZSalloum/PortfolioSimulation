import { GridComponent, ColumnsDirective, ColumnDirective, QueryCellInfoEventArgs, Column, Inject, Edit, EditSettingsModel, CommandColumn, CommandModel, dataStateChange } from "@syncfusion/ej2-react-grids";
import { getValue } from '@syncfusion/ej2-base';
import React, { useState, useEffect, useContext, FunctionComponent } from "react";
import './Trading.css';
import { TradePortfolioEntry, TradePortfolio } from "./Types";
import { updateEntryQuantity } from "../services/api";

type Operation = {
    stockId:number;
    operation:number;
}

let operations : Operation[] = [];

function setOperation(id:number, oper:number){
    let result = operations.filter((o)=>o.stockId == id);
    if(result !== undefined && result != null && result.length>0){
        result[0].operation = oper;
    }else{
        operations.push({stockId:id, operation:oper})
    }
}

function getOperation(id:number){
    let result = operations.filter((o)=>o.stockId == id);
    if(result !== undefined && result != null && result.length>0){
        return result[0].operation;
    }

    return 0;
}

function updateOperation(id:number, delta:number){
    let o = getOperation(id);
    setOperation(id, o + delta);
}

function cancelOperation(id:number){
    setOperation(id, 0);
}

function commitOperation(portfolio:TradePortfolio, id:number){
    let o = getOperation(id);
    updateEntryQuantity(portfolio.id, id, o).then((e:any)=>{
                let entry = portfolio.entries.find(entry=>entry.stockId==id);
                if(entry!=null){
                    entry.quantity = e.quantity;
                    setOperation(id, 0);
                }
        }
    );
}

type TradingProps = {
    tradePortfolio: TradePortfolio
  }

  let grid: GridComponent | null = null;

  let tradePortfolio:any = null;
const Trading : FunctionComponent<TradingProps> = (props) => {

    tradePortfolio = props.tradePortfolio;
    let entries : TradePortfolioEntry[] = tradePortfolio?.entries;
    grid?.refresh();

      function gridButton(props:any):any{
          let buttonCancel;
          let buttonCommit;
          if(getOperation(props.stockId)!=0){
            buttonCancel = <button title="Cancel" onClick={()=>{cancelOperation(props.stockId); grid?.refresh()}}style={{height:20,width:20}}>x</button>
            buttonCommit = <button  title="Commit" onClick={()=>{commitOperation(tradePortfolio, props.stockId); grid?.refresh()}}style={{height:20,width:20}}>v</button>
        }else{
            buttonCancel = <></>
            buttonCommit = <></>
          }
          return (
              <div style={{width:200,display: "flex",alignContent: "left"}}>
          <span style={{height:20,width:50,marginLeft:10}}>{getOperation(props.stockId)}</span>
          <span style={{marginRight:0}}>
          <button  title="Increase" onClick={()=>{updateOperation(props.stockId, 1); grid?.refresh()}} style={{height:20,width:20}}>+</button>
          <button  title="Decrease" onClick={()=>{updateOperation(props.stockId, -1); grid?.refresh()}}style={{height:20,width:20}}>-</button>
            {buttonCancel}
            {buttonCommit}
          </span>
          </div>);
      }

return (
    <div>
    <GridComponent dataSource={entries} queryCellInfo={customizeCell} enableHover={false}  allowSelection={false}
    ref={g => {grid = g; }}  >
        <ColumnsDirective>
          <ColumnDirective field = 'stockId' headerText='Id' textAlign='Left' width='50'/>
          <ColumnDirective field = 'name' headerText='Name' textAlign='Left' width='100'/>
          <ColumnDirective field = 'price' headerText='UnitPrice' textAlign='Right' width='50' format="n2"/>
          <ColumnDirective field = 'delta' headerText='Delta' textAlign='Right' width='50' format="n2"/>
          <ColumnDirective field = 'quantity' headerText='Quantity' textAlign='Right' width='50'/>
          <ColumnDirective field = 'amount' headerText='Amount' textAlign='Right' width='50'  format = "n2"/>  
          <ColumnDirective headerText='Buy/sell' width='50' template={gridButton} textAlign='Center' />
        </ColumnsDirective>
      </GridComponent>
    </div>
)
}

function customizeCell(args: QueryCellInfoEventArgs| undefined) {
    
    let fld = (args?.column as Column).field;

    if( (fld === "delta" )
      && args?.data && args?.cell) {
          let val = getValue('delta', args.data);
        if (val < 0){
            args.cell.classList.add('down');
        } else if(val > 0 ) {
            args.cell.classList.add('up');
        }
    }
}






export default Trading;