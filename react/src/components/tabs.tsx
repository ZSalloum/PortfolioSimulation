import React from "react";
import { TabComponent, TabItemDirective, TabItemsDirective } from '@syncfusion/ej2-react-navigations';
import Operations from "./Operations";
import { TradingToolbar } from "./TradingToolbar";
import { TradingProvider } from "../providers/TradingProvider";
import TradingPanel from "./TradingPanel";
import TradingWrapper from "./TradingWrapper";


function AppTabs() {
    const headerText = [{ text: "Trading" }, { text: "Operations" }];
    return (
      <div id='trading-app' style={{minHeight:500}}>
        <TradingProvider>
        <TradingToolbar/>
        <TradingPanel/>
        {/* <TabComponent heightAdjustMode='Auto'>
        <TabItemsDirective>
          <TabItemDirective header={headerText[0]} content={TradingWrapper}/>
          <TabItemDirective header={headerText[1]} content={Operations}/>
        </TabItemsDirective>
      </TabComponent> */}
      </TradingProvider>
      </div>
    );
  }


  
  export default AppTabs;