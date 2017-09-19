import React from 'react';

const Header = (props) => {
    return(
        <div className="Header-div">
            <div className="center-div">
     <h1 className="titleh1"> No Sleep </h1>
     <h2 className="titleh2">together!</h2>
        </div>
        {props.user && <button onClick={props.signout}>sign out</button>}
     <nav className="navDiv"> 


    </nav>
    </div>
    )
}

export default Header;