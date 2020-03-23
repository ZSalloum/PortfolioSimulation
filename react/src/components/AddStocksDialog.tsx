import { DialogComponent } from '@syncfusion/ej2-react-popups';
import React, { useState, useContext, useEffect } from "react";
import { type } from 'os';
import { TextBox, TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { createPortfolio, listPortfolios, getPortfolio, listStocks, addPortfolioEntries } from '../services/api';
import { TradingPortfolioContext } from '../providers/TradingProvider';
import { GridComponent, ColumnsDirective, ColumnDirective, SelectionSettingsModel, RowDataBoundEventArgs } from '@syncfusion/ej2-react-grids';
import { isArray } from 'util';

type AddStocksDialogType = {
    visible:boolean;
    onClose:()=>any;
}

let dialogInstance : DialogComponent | null = null;

let selectedStocks:number[] = []

const AddStocksDialog : React.FunctionComponent<AddStocksDialogType> = ({visible, onClose})=> { 
    const {portfolio} = useContext(TradingPortfolioContext);
    const [stockList, setStockList] = useState([]);
    let settings: SelectionSettingsModel = { checkboxOnly: true};
     
    let grid : GridComponent | null;  
        if(visible != dialogInstance?.visible ){
            dialogInstance?.show();
            selectedStocks = [];
            listStocks().then(resp =>{
                if(resp.ok){
                    resp.json().then((list)=>{
                        list = filterStocks(portfolio, list);
                        setStockList(list);
                        grid?.refresh();
                    })
                }
            })
        }
            

        let buttons = [{
                buttonModel: {
                    content: 'Ok',
                    cssClass: 'e-flat',
                    isPrimary: true,
                },
                'click': () => {  
                    if(portfolio != null){
                        addPortfolioEntries(2, selectedStocks);
                    }
                    dialogClose();
                }
            },
            {
                buttonModel: {
                    content: 'Cancel',
                    cssClass: 'e-flat'
                },
                'click': () => {
                    dialogClose();
                }
            }];

        let dialogClose = () => {
            dialogInstance?.hide();
            onClose();
        };

        function onRowSelected(args:any){
            console.log(args);
            if( isArray(args.data)){
                args.data.forEach((e:any) => {
                    selectedStocks.push(e.id);
                })
            }
            else{
                selectedStocks.push(args.data.id);
            }
            console.log(selectedStocks);
        }

        function onRowDeselected(args:any){
            args.data.forEach((e:any) => {
                selectedStocks = selectedStocks.filter(x=>x!=e.id);
            });
            
            console.log(selectedStocks);
        }
       
    return (
        <DialogComponent width='400px' style={{height:600}} target='#trading-app' 
        close={dialogClose}  showCloseIcon={true} buttons={buttons} visible={false}
        overlayClick={dialogClose} isModal={true} header='Add Stocks'
        ref={dialog => dialogInstance = dialog}>

        <GridComponent dataSource={stockList}  enableHover={true}  allowSelection={true}
            ref={g => {grid = g; }} style={{height:600}} selectionSettings={settings} 
            rowSelected={onRowSelected} rowDeselected={onRowDeselected}>
                <ColumnsDirective>
                    <ColumnDirective type='checkbox' width='50'/>
                    <ColumnDirective field = 'name' headerText='Stock'  textAlign='Left' width='100'/>
                </ColumnsDirective>
        </GridComponent>

        </DialogComponent>);
    
}


function filterStocks(portfolio:any, stocks:any){
    if(portfolio == null || portfolio.entries == null) return stocks;
    let lst = stocks.filter((st:any)=>portfolio.entries.findIndex((e:any)=>e.stockId==st.id)==-1);
    return lst;
}
export default AddStocksDialog;