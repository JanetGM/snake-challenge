import React , {Component} from 'react';
import './App.css';

class App extends React.Component {
 
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
          velocity :{
              x:1,
              y:0
          }
  
        }
    }
}

    //evento para mover a la ardilla cada segundo

    componentDidMount = () => {
        document.addEventListener('keydown',(e)=> {
            this.setVelocity(e);
        });
        setTimeout(()=>{
            this.moveChipmunk()
        },1000)
    }
 
    
    //creando el cuerpo de la ardilla

    showChipmunkHead = (cell) => {
        const {chipmunk}=this.state;
        return(chipmunk.chipmunkHead.row === cell.row && chipmunk.chipmunkHead.col === cell.col );
      } 

    showChipmunkBody = (cell) =>{
        const {chipmunk}=this.state;
        return chipmunk.chipmunkBody.find(isbody=>isbody.row === cell.row && isbody.col === cell.col );
    }

    //mostrar acorn

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
    //creando función que mueve  a la ardilla
    moveChipmunk = () =>{
      
    if(this.state.gameOver)return;
   
    this.setState(({chipmunk,acorn})=>{
    const collidesWithAcorn=this.collidesWithAcorn();
    const nextState = {
     chipmunk:{
       ...chipmunk,
       chipmunkHead:{
        row:chipmunk.chipmunkHead.row + chipmunk.velocity.y,
        col: chipmunk.chipmunkHead.col + chipmunk.velocity.x
       },
       chipmunkBody:[chipmunk.chipmunkHead, ...chipmunk.chipmunkBody]
       },
       acorn:collidesWithAcorn? this.getRandomAcorn():acorn
     };
     
    if(!collidesWithAcorn) nextState.chipmunk.chipmunkBody.pop();
    return nextState;
   },() => {
     if(this.isOffEdge()){
       this.setState({
        gameOver:true,
       })
       return;
     }
     setTimeout(() => {
      this.moveChipmunk()
    },1000)
  });
}
collidesWithAcorn = () => {
    const {acorn,chipmunk} = this.state;
    return acorn.row === chipmunk.chipmunkHead.row 
      && acorn.col === chipmunk.chipmunkHead.col 
  }
  
  isOffEdge = () => {
      const {chipmunk} = this.state
      if(chipmunk.chipmunkHead.col>15
        ||chipmunk.chipmunkHead.co<0
        ||chipmunk.chipmunkHead.row>15
        ||chipmunk.chipmunkHead.row<0)
      return true;  
    }
  
  
    setVelocity = (event) => {

        if(event.keyCode===40)
        { 
          this.setState(({chipmunk})=>({
          chipmunk:{
            ...chipmunk,
            velocity:{
              x:0,
              y:-1
            }
          }
        }))
    }else if(event.keyCode===38)
        {
      this.setState(({chipmunk})=>({
        chipmunk:{
          ...chipmunk,
          velocity:{
            x:0,
            y:1
          }
        }
      }))
    
    }else if (event.keyCode===37)
    {
      this.setState(({chipmunk})=>({
        chipmunk:{
          ...chipmunk,
          velocity:{
            x:1,
            y:0
          }
        }
      }))
    
    }else if (event.keyCode===39)
    {
      this.setState(({chipmunk})=>({
        chipmunk:{
          ...chipmunk,
          velocity:{
            x:-1,
            y:0
          }
        }
      }))
          } 
        }


    render(){
        const {grid,chipmunk,gameOver}=this.state
     
        return(
        <div className="App">
          {
            (gameOver)?console.log('perdiste'):
            <div onKeyPress={this.setVelocity} className="grid" >
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
          }

        </div>
        )
    }
  
}
export default App;
