//import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://localhost:8080/api/v1/";
const portfolioServiceUrl = baseUrl + "portfolio/"
const quoteserviceUrl = baseUrl + "quotes/"


export function getPortfolio(id:number) {
  return fetch(portfolioServiceUrl+id);
    //.then(handleResponse)
    //.catch(handleError);
}

export function listPortfolios() {
  return fetch(portfolioServiceUrl+"list");
}

export function addPortfolioEntries(id:number, stocks:number[]) {
  return postData(portfolioServiceUrl+"entries/"+id, stocks);
}

export function updateEntryQuantity(portfolioId:number, id:number, qty:number){
  return postData(portfolioServiceUrl+"operation/"+portfolioId, {stockId:id, delta:qty});
}

export function getQuotes() {
    return fetch(quoteserviceUrl);
  }

export function listStocks() {
  return fetch(quoteserviceUrl+"stocks");
}

export function createPortfolio(name:string, includeStocks:boolean){
  return postData(portfolioServiceUrl, {name, includeStocks});
}




// Example POST method implementation:
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}