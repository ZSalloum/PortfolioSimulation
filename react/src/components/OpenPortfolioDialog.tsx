import { DialogComponent } from '@syncfusion/ej2-react-popups';
import React, { useState, useContext, useEffect } from "react";
import { type } from 'os';
import { TextBox, TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { createPortfolio, listPortfolios, getPortfolio } from '../services/api';
import { TradingPortfolioContext } from '../providers/TradingProvider';
import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-grids';

type OpenPortfolioDialogType = {
    visible:boolean;
    onClose:()=>any;
}

let dialogInstance : DialogComponent | null = null;



const OpenPortfolioDialog : React.FunctionComponent<OpenPortfolioDialogType> = ({visible, onClose})=> { 
    const [portfolioList, setPortfolioList] = useState([]);
    const {portfolio, updatePortfolio} = useContext(TradingPortfolioContext);
     
    let grid : GridComponent | null;  
        if(visible != dialogInstance?.visible ){
            dialogInstance?.show();
        }
            

        let buttons = [{
                buttonModel: {
                    content: 'Close',
                    cssClass: 'e-flat',
                    isPrimary: true,
                },
                'click': () => {    
                    dialogClose();
                }
            }];

        let dialogClose = () => {
            dialogInstance?.hide();
            onClose();
        };

        useEffect(()=>{
            if(portfolioList == null || portfolioList.length == 0){
                listPortfolios().then((resp)=>{
                    if(resp.ok){
                        resp.json().then((list)=>{
                            setPortfolioList(list);
                        })
                    }
                });
            }            
        })

        function loadPortfolio(id:number){
            if(id > 0){
                getPortfolio(id).then((response:any)=>{
                    if (response.ok) {
                        response.json().then((p:any) => {
                          updatePortfolio(p);
                          console.log(JSON.stringify(portfolio));
                        });
                      }
                })
            }
            
            dialogClose();
        }

        function gridLink(props:any):any{
            return (
                <a href='javascript:' onClick={()=>{loadPortfolio(props.id)}}>
            {props.name}
            </a>);
        }
        
    return (
        <DialogComponent width='400px' style={{height:600}} target='#trading-app' 
        close={dialogClose}  showCloseIcon={true} buttons={buttons} visible={false}
        overlayClick={dialogClose} isModal={true} header='Open Portfolio'
        ref={dialog => dialogInstance = dialog}>

        <GridComponent dataSource={portfolioList}  enableHover={true}  allowSelection={true}
            ref={g => {grid = g; }} style={{height:600}}>
                <ColumnsDirective>
                <ColumnDirective field = 'name' headerText='Portfolio' template={gridLink} textAlign='Left' width='100'/>
                </ColumnsDirective>
        </GridComponent>

        </DialogComponent>);
    
}
export default OpenPortfolioDialog;