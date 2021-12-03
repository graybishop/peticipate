import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { BIIGGIE } from "../../utils/queries";
import { useQuery } from '@apollo/client';

const BiiggiePage = (props) => {
  let {biiggieId} = useParams()
  let {data,error, loading} = useQuery(BIIGGIE, {variables:{id:biiggieId}})
   
  const data2 = 
    {
      title: "Taco Food Truck Startup",
      createdAt: new Date(new Date().setDate(new Date().getDate())),
      deadline: new Date(new Date().setDate(new Date().getDate() + 9)),
      description:
        "My Biiggie that I I need help getting my dream taco food truck business off the ground. I serve all types of tacos and have worked very hard renovating an old truck I but. Any help is welcome!",
      images: [
        "https://mobile-cuisine.com/wp-content/uploads/2015/09/food-truck-branding.jpg",
      ],
      comment: "",
    }
  const Comments = [
    {
      comments: "",
    },
  ];
  const [formState, setFormState] = useState({});
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  if (loading) return <p>Loading ...</p>;
  data = data.biiggie
  return (
      
    <div className="flex flex-col gap-1 text-xl">
      Biiggie Page
      <p className="text-2xl">Biiggie Title{data.title}</p>
      <p>Biiggie Description{data.description}</p>
      <img src={data.images} alt="" />
      {/* <p>Date Created {data.createdAt.toLocaleString()}</p> */}
      <p className="text-xl">Deadline here{data.deadline.toLocaleString()}</p>
      <h2 className="text-xl">View Sources </h2>
      <h3>Total number of assignees to achieve my goal:{data.assignee}</h3>
      <button link="Signup">Sign Up</button>
      <button link="https://www.instagram.com/">Share with Instagram</button>
      <button link="https://www.reddit.com/">Share with Reddit</button>
      <div>
        <label htmlFor="comment">Leave a thought or comment </label>
        <textarea 
          name="comments"
          rows="10"
          defaultValue={Comments}
          onBlur={handleChange}
        />
      </div>
    </div>
  );
};

export default BiiggiePage;
