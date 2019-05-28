import React from 'react';

const Scoreboard = ({size}) =>{

    return(
        
        <div className=" container-flex mt-5 border ">
            <p className="h1 text-center">SCORE BOARD </p>
            { 
    
                size.map((score,i) => (
                   <p key={i}>Partida{i+1 }:{score}</p>
                ))
                
                
         }
        </div>
    )
}
export default Scoreboard;
