import { useParams } from "react-router-dom";
import { BIIGGIE } from "../../utils/queries";
import { useQuery } from '@apollo/client';
import  CommentForm  from "./CommentForm"

const BiiggiePage = (props) => {
  let {biiggieId} = useParams()
  let {data, loading} = useQuery(BIIGGIE, {variables:{id:biiggieId}})
   
  
  if (loading) return <p>Loading ...</p>;
  data = data.biiggie
  return (
      
    <div className="container mx-auto flex flex-col gap-1 text-xl">
      Biiggie Page
      <p className="text-2xl">{data.title}</p>
      <p>{data.description}</p>
      <img src={data.images} alt="" />
      {/* <p>Date Created {data.createdAt.toLocaleString()}</p> */}
      <p className="text-xl">Deadline{data.deadline.toLocaleString()}</p>
      <h2 className="text-xl">Sources: </h2>
      <h3>Total number of assignees to achieve my goal:{data.assignee}</h3>
      <button link="Signup">Sign Up</button>
      <button link="https://www.instagram.com/">Share with Instagram</button>
      <button link="https://www.reddit.com/">Share with Reddit</button>
      <div>
        <CommentForm/>
      </div>
    </div>
  );
};

export default BiiggiePage;
