import { Link, useParams } from "react-router-dom";
import { BIIGGIE } from "../../utils/queries";
import { useQuery } from '@apollo/client';
import  CommentForm  from "./CommentForm"


const BiiggiePage = ({biiggie}) => {
  let {biiggieId} = useParams()
  let {data, loading} = useQuery(BIIGGIE,  {variables:{id:biiggieId}})
  
  if (loading) return <p>Loading ...</p>;
  data = data.biiggie
  return (
      
    <div className="container mx-auto flex flex-col gap-1 text-xl">
      <p className="text-3xl font-extrabold text-center p-8">{data.title}</p>
      <img src={data.images} alt="" />
      <div className="bg-blue-nav-button rounded-b-lg divide-x-2">
      <img className="object-contain  float-left rounded-full min-w-12 h-12" id="profileImage"
          src="https://source.unsplash.com/featured/1000x1000/?profile" alt="biggie author" />
          <p className="italic font-bold">{data.createdBy}Taco Bob</p>
          <p className="content-center font-semibold text-1xl p-2 ">{data.description}</p>
      </div>
      {/* <p>Date Created {data.createdAt.toLocaleString()}</p> */}
      <p className="text-3xl text-center text-orange-hover font-semibold animate-pulse">Deadline: {Math.floor((new Date(data.deadline) - new Date()) / 1000 / 86400)} Days Left!</p>
      <h2 className="text-xl font-semibold">{data.sources}Sources: </h2>
      <h3 className="font-semibold">Collaborators: 1/3 {data.numOfPeople}</h3>
      <div className="space-x-2">
      <Link to="/sign-up"> 
      <button className="bg-orange-primary text-white italic p-2 shadow font-semibold text-lg rounded-full">  Sign Up  </button>
      </Link>
      <Link to="https://www.instagram.com/">
        <button className="bg-orange-primary text-white italic p-2 shadow font-semibold text-lg rounded-full" >Share on Instagram</button>
      </Link>
      <Link to="https://www.reddit.com/">
      <button className="bg-orange-primary text-white italic p-2 shadow font-semibold rounded-full">Share on Reddit</button>
      </Link>
      </div>
      <div>
        <CommentForm/>
      </div>
    </div>
  );
};

export default BiiggiePage;
