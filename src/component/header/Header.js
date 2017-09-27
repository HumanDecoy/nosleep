import React from 'react';
import Logout from './Logout.js';
import HighButton from './HighButton.js';
const Header = (props) => {
    return(
        <div className="Header-div">
           {props.user &&   <Logout onClick={props.signout} title="Sign out" />}
     <h1 className="titleh1"> No Sleep </h1>
     <h2 className="titleh2">together!</h2>
  

    </div>
    )
}

export default Header;