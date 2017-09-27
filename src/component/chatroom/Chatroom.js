import React from "react";


const Chatroom = (props) => {
  return (
    <div className="chatDiv">
   <h2> You are now not sleeping with : {props.p2}! </h2>
  
  <form  className="main-form" onSubmit={props.onSubmit}>
  <label htmlFor="text">Message:</label>
   <input value={props.posttext} name ={props.name} type='text' onChange={props.onChange}/>
   <input type="submit" value="send"/>
   <button onClick={props.exit}> Exit chatroom </button>
     </form>
     <div className="main-form-posts">
   {props.posts}
   </div>

      
      </div>

 
  );
}

export default Chatroom;