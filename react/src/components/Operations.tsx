import { GridComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-grids";
import React from "react";
import { data } from "../datasource";

function Operations(){
return (
    <div>
              <GridComponent dataSource={data} >
        <ColumnsDirective>
          <ColumnDirective field = 'Id' headerText='Id' textAlign='Left' width='50'/>
          <ColumnDirective field = 'Name' headerText='Name' textAlign='Left' width='50'/>
          <ColumnDirective field = 'UnitPrice' headerText='UnitPrice' textAlign='Right' width='150'/>
          <ColumnDirective field = 'Quantity' headerText='Quantity' textAlign='Right' width='150'/>
          <ColumnDirective field = 'Amount' headerText='Amount' textAlign='Right' width='150'/>        
        </ColumnsDirective>
      </GridComponent>
    </div>
)
}

export default Operations;