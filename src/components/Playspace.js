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

    //creando estado 

    this.state ={
        grid,
        acorn:{
            row:Math.floor(Math.random()*16),
            col:Math.floor(Math.random()*16),
        },
        chipmunk:{
          chipmunkHead:{
            row:8,
            col:8
          },
          chipmunkBody:[0,1],
  
        }
    }
}


    //creando el cuerpo de la chipmunk

    showChipmunkHead = (cell) => {
        const {chipmunk}=this.state;
        return(chipmunk.chipmunkHead.row === cell.row && chipmunk.chipmunkHead.col === cell.col );
      } 

    showChipmunkBody = (cell) =>{
        const {chipmunk}=this.state;
        return chipmunk.chipmunkBody.find(isbody=>isbody.row === cell.row && isbody.col === cell.col );
    }

    //mostrar bellota

    showAcorn = (cell) =>{
      const {acorn}=this.state;
      return (acorn.row === cell.row && acorn.col === cell.col);
    }

    getRandomAcorn = () =>{
        const {chipmunk}=this.state;
        const newAcorn = {
            row: Math.floor(Math.random() * 15),
            col: Math.floor(Math.random() * 15),
        }
        if (this.showChipmunkBody(newAcorn) || (
            chipmunk.chipmunkHead.row === newAcorn.row
            && chipmunk.chipmunkHead.col === newAcorn.col)) {
            return this.getRandomAcorn();
          } else {
            return newAcorn;
          }

    }

    render(){
        const {grid,chipmunk}=this.state
        return(
            <div className="grid" >
              {
                  grid.map((row,i)=>
                  row.map(cell => (
                      <div key={`${cell.row} ${cell.col}`}className={`cell
                       ${
                           this.showChipmunkHead(cell)
                        ? 'head': this.showAcorn(cell)
                        ? 'acorn':this.showChipmunkBody(cell)
                        ? 'bodyChipmunk':''
                        }`
                    } ></div>
                  ))
                  )
              }

            </div>
        )
    }

}
export default Playspace;
