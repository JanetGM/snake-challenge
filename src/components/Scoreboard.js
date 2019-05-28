import React from 'react';

const Scoreboard = ({size}) =>{

    return(
        <div className=" container-flex mt-5 border ">
            <p className="h1">Score board</p>
            <p>{size}</p>
        </div>
    )
}
export default Scoreboard;
