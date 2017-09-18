import React from 'react';

const Header = (props) => {
    return(
        <div>
     <h1> No Sleep </h1>
     {props.user && <button onClick={props.signout}>sign out</button>}
     <nav className="navDiv"> 


    </nav>
    </div>
    )
}

export default Header;