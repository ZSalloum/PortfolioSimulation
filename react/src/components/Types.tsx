export interface TradePortfolio{
    name: string;
    id:number;
    entries:TradePortfolioEntry[];
}

export interface TradePortfolioEntry{
    name:string;
    stockId:number;
    quantity:number;
    price:number;
    delta:number;
    amount:number;
    operation:number;
}