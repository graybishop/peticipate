import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';


const Profile = () => {
    const { loading, data } = useQuery(QUERY_ME)
    const user = data?.me || data?.user || {};
    if (loading) return <p>Loading ...</p>;
    return(
        <div className="text-center box-border p-4 border-4 m-4 mx-auto">
            <img className="object-cover rounded-full border shadow h-60 w-60  mx-auto" id="profileImage"          src={user.image} alt="user profile" />
            <div className="box-border">{user.username}</div>
            <div>{user.email}</div>
            <div>{user.firstName} {user.lastName} </div>
            {/* <div>{user.description}</div> */}
            {/* <div>{user.createdBiiggies}</div> */}
            <div>
            <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
    {/* <!--Card 1--> */}
    <button className="btn">
    <div className="rounded overflow-hidden shadow-lg">
      <img className="w-full" src="" alt="Biiggie"/>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Biiggie 1</div>
        <p className="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Food</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Politics</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Education</span>
      </div>
    </div>
    </button>
    {/* <!--Card 2--> */}
    <button className="btn">
    <div className="rounded overflow-hidden shadow-lg">
      <img className="w-full" src="" alt="Biiggie"/>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Biiggie 2</div>
        <p className="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Food</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Politics</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Education</span>
      </div>
    </div>
    </button>
    {/* <!--Card 3--> */}
    <button className="btn">
    <div className="rounded overflow-hidden shadow-lg">
      <img className="w-full" src="" alt="Biiggie"/>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Biiggie 3</div>
        <p className="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Food</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Politics</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Education</span>
      </div>
    </div>
    </button>
  </div>
</div>
<button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
  Build My <span className="font-bold">Biiggie</span> Now
</button>
        </div>

    )


}
export default Profile;
