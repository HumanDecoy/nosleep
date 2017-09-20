import React from 'react';


const Search = (props) => {
    return (
      <form onSubmit={props.onSubmit}>
        <label htmlFor="male">Only guys?</label>
        <input name="male" type = "checkbox" value = "male" onChange = {props.onChange} />
        <label htmlFor="girls">Only girls?</label>
        <input name="girl" type = "checkbox" value = "girl" onChange = {props.onChange} />
        <input type="submit" value="Search" />
    
      </form>
    );
  }
  
  export default Search;

