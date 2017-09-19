import React from "react";

const ButtonReg = (props) => {
  return (
    <button name="register" value="true" onClick={props.onChange}> Register </button>
  );
}

export default ButtonReg;