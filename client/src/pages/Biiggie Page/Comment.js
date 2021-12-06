import React from "react"


export default function Comment(props) {
    const cardStyle = {
        width: '18rem',
      };
    console.log(props)

    return (
        <div className="container">
          <div className="card" style={cardStyle}>
            <img
              className="card-img-top"
              src="https://source.unsplash.com/featured/1000x1000/?profile"
              alt="profile"
            />
            <div className="card-body">
            <h5 className="card-author">Comment By{props.comment?.author.username}</h5>
              <p className="card-body">My Comment{props.comment?.body}</p>
            </div>
          </div>
        </div>
      );
};

