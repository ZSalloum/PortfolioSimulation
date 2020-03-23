import { ToolbarComponent } from '@syncfusion/ej2-react-navigations';
import React, { useState, useRef } from 'react';
import NewPortfolioDialog from './NewPortfolioDialog';
import OpenPortfolioDialog from './OpenPortfolioDialog';
import AddStocksDialog from './AddStocksDialog';


const TradingToolbar : React.FunctionComponent<{}> = ()=>{
    const [newPortfolioDialogStatus, setNewPortfolioDialog] = useState(false);
    const [openPortfolioDialogStatus, setOpenPortfolioDialog] = useState(false);
    const [openAddStockDialog, setOpenAddStockDialog] = useState(false);
    
    function newPortfolioDialogClosed(){
        setNewPortfolioDialog(false);
    }
    function openPortfolioDialogClosed(){
        setOpenPortfolioDialog(false);
    }
    function openAddStockDialogClosed(){
        setOpenAddStockDialog(false);
    }


    return (<ToolbarComponent>
        <div>
            <div><button className='e-btn e-tbar-btn' onClick={()=>setNewPortfolioDialog(true)}>New Portfolio</button> </div>
            <div><button className='e-btn e-tbar-btn' onClick={()=>setOpenPortfolioDialog(true)}>Open Portfolio</button> </div>
            <div><button className='e-btn e-tbar-btn' onClick={()=>setOpenAddStockDialog(true)}>Add Stock</button> </div>
        </div>
        <NewPortfolioDialog  visible={newPortfolioDialogStatus} onClose={newPortfolioDialogClosed} />
        <OpenPortfolioDialog  visible={openPortfolioDialogStatus} onClose={openPortfolioDialogClosed} />
        <AddStocksDialog  visible={openAddStockDialog} onClose={openAddStockDialogClosed} />
    </ToolbarComponent>);
}


export {TradingToolbar};