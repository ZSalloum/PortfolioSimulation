import React, { useEffect } from 'react'
import { getQuotes } from '../services/api';


const initialTradingState = {
    quotes:[]
  };


  type SetValue = (v: any)=>void;
interface IPortfolioContainerContext{
  portfolio : any;
  updatePortfolio: SetValue;
}
  
const TradingContext = React.createContext(initialTradingState);
const TradingPortfolioContext = React.createContext({portfolio:null, updatePortfolio:(v:any)=>{console.log("empty", v)}});



let globalQuotes:any;
let handleQuotes:any = null;

let polling = false;
function setPolling(v:boolean){
  polling = v;
}

function startPolling(){
  return setInterval(()=>{
    if(polling) return;
    setPolling(true);
    
      getQuotes().then((response:any)=>{
        if (response.ok) {
            response.json().then((json:any) => {
              globalQuotes = json;
              if(handleQuotes != null)
                  handleQuotes(json);
              setPolling(false);
            });
          }
      })
  }, 500);
}

startPolling();

function TradingProvider(props:any) {
  const [quotes, setQuotes] = React.useState(globalQuotes);
  const [portfolio, setPortfolio] = React.useState(null);

  function refreshQuotes(_quotes:any){
    setTimeout(() => {
      setQuotes(_quotes);
    }, 0);
  }
  handleQuotes = refreshQuotes;

  function updatePortfolio(p:any){
    setPortfolio(p);
  }


  return (<TradingContext.Provider value={{quotes}} {...props} >
    <TradingPortfolioContext.Provider value={{portfolio, updatePortfolio}}  {...props}>
    {props.children}
    </TradingPortfolioContext.Provider>
  </TradingContext.Provider>)
}


export {TradingProvider, TradingContext, TradingPortfolioContext}