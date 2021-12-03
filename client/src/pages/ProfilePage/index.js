import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_PROFILE, QUERY_ME } from '../../utils/queries';


const Profile = () => {
    const { userId } = useParams();
    const { loading, data } = useQuery(
      userId ? QUERY_SINGLE_PROFILE : QUERY_ME
    )
    const user = data?.me || data?.user || {};
    console.log(user)
    return(
        <div className="text-center box-border p-4 border-4 m-4 mx-auto">
            <img class="object-contain rounded-full border shadow max-h-60 mx-auto" id="profileImage"          src="https://source.unsplash.com/featured/1000x1000/?profile" alt="user profile" />
            <div className="box-border">{user.username}</div>
            <div>{user.email}</div>
            <div>{user.firstName} {user.lastName} </div>
            {/* <div>{user.description}</div> */}
            {/* <div>{user.createdBiiggies}</div> */}
            <div>
            <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
    {/* <!--Card 1--> */}
    <button class="btn">
    <div class="rounded overflow-hidden shadow-lg">
      <img class="w-full" src="" alt="Biiggie"/>
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">Biiggie 1</div>
        <p class="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.
        </p>
      </div>
      <div class="px-6 pt-4 pb-2">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Food</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Politics</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Education</span>
      </div>
    </div>
    </button>
    {/* <!--Card 2--> */}
    <button class="btn">
    <div class="rounded overflow-hidden shadow-lg">
      <img class="w-full" src="" alt="Biiggie"/>
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">Biiggie 2</div>
        <p class="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.
        </p>
      </div>
      <div class="px-6 pt-4 pb-2">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Food</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Politics</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Education</span>
      </div>
    </div>
    </button>
    {/* <!--Card 3--> */}
    <button class="btn">
    <div class="rounded overflow-hidden shadow-lg">
      <img class="w-full" src="" alt="Biiggie"/>
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">Biiggie 3</div>
        <p class="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.
        </p>
      </div>
      <div class="px-6 pt-4 pb-2">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Food</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Politics</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Education</span>
      </div>
    </div>
    </button>
  </div>
</div>
<button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
  Build My <span class="font-bold">Biiggie</span> Now
</button>
        </div>

    )


}
export default Profile;
