import { FunctionComponent, useState } from "react";
import React from "react";
import TradingPanel from "./TradingPanel";

// wraps components because it can't use hooks directly when it is a direct content of Syncfusion Tab
const TradingWrapper : FunctionComponent<any> = (props)=> {
    return(
      <TradingPanel/>
    )
  }


  export default TradingWrapper;