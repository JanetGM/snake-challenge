import React from 'react';
import './App.css';
import Scoreboard from './components/Scoreboard';

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
          },
  
        },
        score:[]
       
    }
}

    
    //evento para mover a la ardilla cada segundo

    componentDidMount = () => {
        document.addEventListener('keydown',(e)=> {
            this.setVelocity(e);
        });
        setTimeout(()=>{
            this.moveChipmunk()
        },500)
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

    //obtener aleatoriamente las bellotas
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

    handleClick = () =>{
      
       this.setState(({chipmunk,score}) => {
        
         const newState = {
            chipmunk:{
            chipmunkHead:{
              row:1,
              col:1
            },
            chipmunkBody:[{row:1,col:3},{row:1,col:2}],
            velocity :{
                x:1,
                y:0
            },
          },
          score:[...score,chipmunk.chipmunkBody.length-2],
          acorn:{
              row:Math.floor(Math.random()*16),
              col:Math.floor(Math.random()*16),
          },
          gameOver:false,
          
          }
          return newState;
        }
        
      );
      setTimeout(() => {
        this.moveChipmunk()
      },500)
        
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
       chipmunkBody:[chipmunk.chipmunkHead, ...chipmunk.chipmunkBody],
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
    },100)
  });
}
collidesWithAcorn = () => {
    const {acorn,chipmunk} = this.state;
    return acorn.row === chipmunk.chipmunkHead.row 
      && acorn.col === chipmunk.chipmunkHead.col 
  }
  
  isOffEdge = () => {
      const {chipmunk} = this.state
      if(chipmunk.chipmunkHead.col>16
        ||chipmunk.chipmunkHead.col<0
        ||chipmunk.chipmunkHead.row>16
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
        const {grid,gameOver,score}=this.state;
        return(
        <div className="App">
         <div className="container-fluid">
           {
             <div className="row">
                <div className="col-4">
                  <Scoreboard size={score}/>
                </div>
                <div className="col-6">
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
                        } >
                        </div>
                      ))
                    )
                  }
                  </div>       
              </div>
              <div className="col-2 mt-5">
                  {(gameOver)
                    ? 
                    <div>
                    <button type = 'button' className="buttonSize" onClick={this.handleClick.bind(this)}>
                      <i className="fas fa-sync"></i>
                    </button>
                    <p>volver a jugar</p>
                 </div>
                    :''} 
                </div>    
            </div>
           }
          </div>
        </div>
        )
    }
  
}
export default App;

