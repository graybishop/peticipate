import React from "react"

import Comment from "./Comment"


export default function CommentSection(props) {
    let commentsElementArray = props.comments.map((item) => {
        return <Comment biiggie={item} key={item._id} />;
      });
    
    return (<div>{commentsElementArray}</div>)
}