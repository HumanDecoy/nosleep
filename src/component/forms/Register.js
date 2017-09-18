import React from "react";
import Form from './Form';

const Register = (props) => {
  return (
    <Form 
    formName='register' 
    name1="username" 
    name2="password" 
    button1="Register" 
    onSubmit={props.onSubmit}
    onChange={props.onChange}
    />
  );
}

export default Register;