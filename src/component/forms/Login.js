import React from "react";
import Form from './Form';

const Login = (props) => {
  return (
    <Form
    formName='Login' 
    name1="username" 
    name2="password" 
    button1="Login" 
    onSubmit={props.onSubmit}
    onChange={props.onChange}/>
  );
}

export default Login;