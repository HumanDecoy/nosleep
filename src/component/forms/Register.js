import React from "react";
import Form from './Form';
import ButtonReg from './ButtonReg.js';

const Register = (props) => {
  return (
    <div>
         <div className="main-form ">
      <h2 className="text-center"> Register</h2>
      <h3 className="error">{props.errormsg} </h3>
      </div>
    <Form 
    formName='register' 
    name1="username" 
    name2="password" 
    name3="currentUsername"
    button1="Register" 
    button2="Cancel"
    onSubmit={props.onSubmit}
    onChange={props.onChange}
    />
  
    </div>
  );
}

export default Register;