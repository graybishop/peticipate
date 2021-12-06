import React from "react"

import Comment from "./Comment"


export default function CommentSection(props) {
    let commentsElementArray = props.comments.map((item) => {
        return <Comment comment={item} key={item._id} />;
      });
    
    return (<div className='flex flex-col gap-4 w-full'>
      {commentsElementArray}
      </div>)
}