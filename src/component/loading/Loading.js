import React from 'react';

const Loading = (props) => {
    return(
        <div className="loading">
       <h2> SEARCHING! </h2>
       <div className="circleGif">
       </div>
       <button name="searching" value="" onClick={props.onClick} className="center-div"> Cancel </button>
    </div>
    )
}

export default Loading;