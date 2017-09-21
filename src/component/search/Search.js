import React from 'react';


const Search = (props) => {
    return (
      <form  className="main-form" onSubmit={props.onSubmit}>
        <h2> Reason for insomnia : </h2>
        <label htmlFor="Any Reason">Any Reason</label>
        <input name="any" type = "checkbox" value = "any" onChange = {props.onChange} />
        <label htmlFor="work">Work Issues</label>
        <input name="work" type = "checkbox" value = "work" onChange = {props.onChange} />
        <label htmlFor="energy">Energy Drinks</label>
        <input name="energy" type = "checkbox" value = "energy" onChange = {props.onChange} />
        
        
        <input type="submit" value="Search" onClick={props.toggleSearch} />
    
      </form>
    );
  }
  
  export default Search;

