import React from 'react';

const Form = (props) => {
    return(
        <div>
        <form className="main-form"  onSubmit ={props.onSubmit}>
            <label htmlFor="email">Email:</label>
            <input name = {props.name1} type='text' onChange={props.onChange}/>
            <label htmlFor="password">Password:</label>
            <input name = {props.name2} type='password' onChange={props.onChange}/>
            {props.formName === 'register' && 
            <label htmlFor="username">Username:</label>
            }
            {props.formName === 'register' && 
            <input name ={props.name3} type='text' onChange={props.onChange}/> }
            <input type="submit" value ={props.button1} onClick={props.onSubmit} />
            {props.formName === 'register' && 
            <button name="register" value="" onClick={props.onChange}>Cancel</button>}
            </form>
            </div>

        
    )
}

export default Form;