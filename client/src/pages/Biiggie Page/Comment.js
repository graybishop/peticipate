import React from "react"


export default function Comment(props) {
    const cardStyle = {
        width: '18rem',
      };
    console.log(props)

    return (
        <div className="container bg-white shadow rounded p-2">
          <div className="card" style={cardStyle}>
            <div className='flex flex-row items-center gap-2 text-black'>
            <img
              className="object-cover rounded-full border-2 shadow h-10 w-10 border-blue-nav-button"
              src={props.comment?.author.image}
              alt="profile"
            />
              <div>
                <p className="font-bold">{props.comment?.author.firstName} {props.comment?.author.lastName}</p>
                <p className="italic">{props.comment?.author.username}</p>
              </div>
            </div>
            <div className="card-body">
              <p className="card-body">{props.comment?.body}</p>
            </div>
          </div>
        </div>
      );
};

