import React , {Component} from 'react';
import { tsConstructorType } from '@babel/types';
import '../App.css';

class Playspace extends React.Component {
 
    constructor(){
    super();
    const grid = [];
    //create grid
    for(let row=0;row<16;row++){
        const colRow=[];
        for(let col=0;col<16;col++){
            colRow.push({
                row,col
            });
        }
        grid.push(colRow);
    }

    this.state ={
        grid,
    }
    }

    render(){
        const {grid}=this.state
        return(
            <div className="grid" >
              {
                  grid.map((row,i)=>
                  row.map(celda=>(
                      <div className="cell"></div>
                  ))
                  )
              }

            </div>
        )
    }

}
export default Playspace;
