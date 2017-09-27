import React from 'react';

const HighButton = (props) => {
    return(
     <button onClick={props.onClick} className ={`${props.className}`}>
         {props.title}
         </button>
    );
}

export default HighButton;