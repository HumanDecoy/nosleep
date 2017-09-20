import React from "react";
import Form from './Form';
import ButtonReg from'./ButtonReg.js';

const Login = (props) => {
  return (
    <div>
       <div className="main-form ">
      <h2 className="text-center"> Please sign in!</h2>
      <h3 className="error">{props.errormsg}</h3>
      </div>
    <Form
    formName='Login' 
    name1="username" 
    name2="password" 
    button1="Login" 
    onSubmit={props.onSubmit}
    onChange={props.onChange}
    />
    
    <div className="main-form">
      <h2 className="text-center"> Dont have an account yet?</h2>
          <ButtonReg onChange={props.onChange}/>
          <button onClick={props.google}> Sign in with google </button>
      </div>
    </div>
  );
}

export default Login;