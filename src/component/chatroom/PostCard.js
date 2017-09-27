import React from "react";


const PostCard = (props) => {
  return (
  <div className="wrapper-chat">  <div className={props.myKey === props.rKey ? "chatMe" : "chatOther"}>
        <h2>{props.myKey === props.rKey ? props.username : props.user2}</h2>
        <p> {props.posttext} </p>
        <p>{props.date}</p>
      </div></div>

 
  );
}

export default PostCard;

