import React from "react"


export default function Comment(props) {
    const cardStyle = {
        width: '18rem',
      };

    return (
        <div className="container">
          <div className="card" style={cardStyle}>
            <img
              className="card-img-top"
              src="https://source.unsplash.com/featured/1000x1000/?profile"
              alt="profile"
            />
            <div className="card-body">
            <h5 className="card-author">Comment By{props.comments.author}</h5>
              <p className="card-body">My Comment{props.comments.body}</p>
            </div>
          </div>
        </div>
      );
};

