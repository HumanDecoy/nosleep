import React from 'react';

const HeaderIn = (props) => {
    return(
    <div className="HeaderIn-div">
          
     <h1 className="titleh1"> No Sleep </h1>
  
     {props.user && <button onClick={props.signout}>sign out</button>}
    </div>
    )
}

export default HeaderIn;