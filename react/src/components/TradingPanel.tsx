import React, { useContext, useEffect, useState, FunctionComponent } from 'react';
import * as service from '../services/api'
import { TradingProvider, TradingPortfolioContext, TradingContext } from '../providers/TradingProvider';
import { TradePortfolio, TradePortfolioEntry } from './Types';
import Trading from './Trading';



const TradingPanel  = (props:any)=> {
  const [tradePortfolio, setTradePortfolio] = useState({} as TradePortfolio);
  const {portfolio, updatePortfolio} = useContext(TradingPortfolioContext);
  const {quotes} = useContext(TradingContext);

  //let tradePortfolio : TradePortfolio = {} as TradePortfolio;

    /*service.getPortfolio(100).then((response:any)=>{
        if (response.ok) {
            response.json().then((p:any) => {
              console.log(JSON.stringify(p));
              updatePortfolio(p);
            });
          }
    })*/

   useEffect(()=>{
      if(portfolio != null){
        console.log("loaded portfolio", portfolio);
        let _tradePortfolio = createTradePortfolio(portfolio);
        setTradePortfolio(_tradePortfolio);
      }
  }, [portfolio]);



   useEffect(() => {
      setTimeout(()=>{
          if(tradePortfolio != null){
              let _pft = updateQuotes(tradePortfolio, quotes) as TradePortfolio;
              setTradePortfolio(_pft);
          }
      },0);

    },[quotes]);


    return (
            <Trading tradePortfolio = {tradePortfolio}></Trading>
    );
  }

  function createTradePortfolio(portfolio:any){
    let tradePortfolio:TradePortfolio = {...portfolio};
    tradePortfolio.entries = [];
    let templateEntry: TradePortfolioEntry = {    
        name:'',
        stockId:0,
        quantity:0,
        price:0,
        delta:0,
        amount:0,
        operation:0};

    for( var i = 0; i<  portfolio.entries.length; i++){
        let e = portfolio.entries[i];
        let tradeEntry: TradePortfolioEntry = {...templateEntry, ...e} as TradePortfolioEntry;
        tradePortfolio.entries.push(tradeEntry);
    }
    return tradePortfolio;
}


function updateQuotes(portfolio:TradePortfolio, quotes: any ){
  let newPortfolio = {...portfolio};
  let entries : TradePortfolioEntry[] = newPortfolio.entries;
  if(entries === undefined || entries == null) return;
  for(let i = 0; i < entries.length; i++){
      let e = entries[i];
      let quote = quotes.filter((q:any) => q.stockId == e.stockId );
      if( quote !== undefined  &&  quote != null && quote.length > 0){
          e.price = quote[0].price;
          e.delta = quote[0].delta;
          e.amount = e.price * e.quantity;
      }
  }
  return newPortfolio;
}

  export default TradingPanel;