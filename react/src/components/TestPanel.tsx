import { FunctionComponent, useState } from "react";
import React from "react";


const TestPanel : FunctionComponent<any> = (props)=> {
    const [a, setA] = useState(true);
    return(
      <div>{a}</div>
    )
  }


  export default TestPanel;