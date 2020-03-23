import { DialogComponent } from '@syncfusion/ej2-react-popups';
import React, { useState, useContext } from "react";
import { type } from 'os';
import { TextBox, TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { createPortfolio } from '../services/api';
import { TradingPortfolioContext } from '../providers/TradingProvider';

type NewPortfolioDialogType = {
    visible:boolean;
    onClose:()=>any;
}

let dialogInstance : DialogComponent | null = null;



const NewPortfolioDialog : React.FunctionComponent<NewPortfolioDialogType> = ({visible, onClose})=> { 
    const ctx = useContext(TradingPortfolioContext);
     
    let textBox : TextBoxComponent | null;  
        if(visible != dialogInstance?.visible ){
            dialogInstance?.show();
        }
            

        let buttons = [{
                buttonModel: {
                    content: 'OK',
                    cssClass: 'e-flat',
                    isPrimary: true,
                },
                'click': () => {
                    console.log(textBox?.value);
                    if(textBox && textBox?.value != ""){
                        createPortfolio(textBox?.value, true)
                        .then(response =>{
                            console.log(response);
                            ctx?.updatePortfolio(response);
                          })
                        textBox.value = "";
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

        
    return (
        <DialogComponent width='400px' style={{height:200}} target='#trading-app' 
        close={dialogClose}  showCloseIcon={true} buttons={buttons} visible={false}
        overlayClick={dialogClose} isModal={true} header='New Portfolio'
        ref={dialog => dialogInstance = dialog}>

        <TextBoxComponent placeholder="Portfolio Name" floatLabelType="Auto" ref={(t)=>textBox=t}/>

        </DialogComponent>);
    
}
export default NewPortfolioDialog;