import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import ProfileBiiggieCard from './ProfileBiiggieCard.js';

const Profile = () => {
    const { loading, data } = useQuery(QUERY_ME)
    const user = data?.me || data?.user || {};
    
    let profileBiiggieCards = user.CreatedBiiggies.map((item) => {
      return <ProfileBiiggieCard biiggie={item} key={item._id} />;
    });

    return(
        <div className="text-center box-border p-4 border-4 m-4 mx-auto">
            <img className="object-contain rounded-full border shadow max-h-60 mx-auto" id="profileImage"          src="https://source.unsplash.com/featured/1000x1000/?profile" alt="user profile" />
            <div className="box-border">{user.username}</div>
            <div>{user.email}</div>
            <div>{user.firstName} {user.lastName} </div>
            {/* <div>{user.description}</div> */}
            {/* <div>{user.createdBiiggies}</div> */}
            <div>
            <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
    {/* <!--Card 1--> */}
    {/* if (loading) { return (<p>Loading ...</p>)} */}
    {/* Renders the users biiggies */}
    {profileBiiggieCards}
    
  </div>
</div>
<button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
  Build My <span className="font-bold">Biiggie</span> Now
</button>
        </div>

    )


}
export default Profile;
