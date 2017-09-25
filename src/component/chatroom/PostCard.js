import React from "react";


const PostCard = (props) => {
  return (
    <div className="postCard">
        <h2>{props.username}</h2>
        <p> {props.posttext} </p>
        <p>{props.date}</p>
      </div>

 
  );
}

export default PostCard;