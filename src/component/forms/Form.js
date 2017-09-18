import React from 'react';

const Form = (props) => {
    return(
        <form onSubmit ={props.onSubmit}>
            <input name = {props.name1} type='text' onChange={props.onChange}/>
            <input name = {props.name2} type='password' onChange={props.onChange}/>
            {props.formName === 'register' && <input name = {props.name3} type='text' onChange={props.onchange}/> }
            <input type="submit" value ={props.button1} onClick={props.onSubmit} />
            
            </form>

        
    )
}

export default Form;