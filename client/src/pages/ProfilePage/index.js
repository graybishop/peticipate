import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME, GET_BIIGIES } from "../../utils/queries";
import ProfileBiiggieCard from "./ProfileBiiggieCard.js";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import auth from "../../utils/auth";
import BiiggiePlaceholder from "./biiggiesPlaceholder";

const Profile = () => {
  let navigate = useNavigate();
  useEffect(() => {
    if (!auth.loggedIn()) {
      navigate("/login");
    }
  });

  useEffect(() => {
    document.title = 'Profile';
  }, []);

  const { loading, data } = useQuery(QUERY_ME, {
    pollInterval: 1000
  });
  const user = data?.me || data?.user || {};

  const { loading: loadingBiiggies, data: biiggiesData } = useQuery(GET_BIIGIES, {
    pollInterval: 1000
  });

  const biiggies = biiggiesData?.biiggies || [];

  let profileBiiggieCards = (
    <div className='flex flex-col'>
      <BiiggiePlaceholder />
    </div>
  );

  console.log(data);

  let profileBiiggiesCommittedToCards =
    <BiiggiePlaceholder />;

  console.log(biiggies);

  if (loading || loadingBiiggies) {
    return (
      <div className='flex flex-col items-center justify-center h-xl'>
        <p className='text-xl'>Pulling some data...</p>
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-orange-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>);
  }

  if (user.createdBiiggies.length !== 0) {
    profileBiiggieCards = user.createdBiiggies.map((item) => {
      return <ProfileBiiggieCard biiggie={item} key={item._id} />;
    });
  }

  let biiggiesCommittedTo = [];
  if (biiggies != null) {
    for (let biiggie of biiggies) {
      if (biiggie.helpOptions != null) {
        for (let helpOption of biiggie.helpOptions) {
          if (helpOption.registeredUsers != null) {
            for (let registeredUser of helpOption.registeredUsers) {
              if (registeredUser._id === user._id) {
                biiggiesCommittedTo.push(biiggie);
              }
            }
          }
        }
      }
    }
  }

  if (biiggiesCommittedTo.length !== 0) {
    profileBiiggiesCommittedToCards = biiggiesCommittedTo.map((item) => {
      return <ProfileBiiggieCard biiggie={item} key={item._id} />;
    });
  }

  let mappedLikes = user.liked.map((item) => {
    return <ProfileBiiggieCard biiggie={item} key={item._id} />;
  });


  return (
    <div className='bg-body-background-blue'>
      <div className="text-center py-4 px-12 container m-4 mx-auto">
        <img
          className="object-cover rounded-full border shadow h-60 w-60  mx-auto"
          id="profileImage"
          src={user.image}
          alt="user profile"
        />
        <div className="box-border">{user.username}</div>
        <div>{user.email}</div>
        <div>
          {user.firstName} {user.lastName}{" "}
        </div>
        <div>
          <div className="text-left">
            <h2 className="pt-10 text-orange-primary font-semibold text-lg border-b-4 border-orange-primary">
              CREATED <span className="font-extrabold">Biiggies</span>
            </h2>
          </div>
          <div className="p-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            <div className='col-span-1 md:col-span-2 xl:col-span-3'>
              {user.createdBiiggies.length === 0 ? <Link
                to="/new-biiggie"
                className="bg-orange-primary text-white p-4 rounded-lg shadow font-semibold text-lg text-center hover:bg-orange-hover">
                Start Building A <span className="font-extrabold">Biiggie</span> Now
              </Link> : null}
            </div>
            {profileBiiggieCards}
          </div>
          <div className="text-left">
            <h2 className="pt-10 text-orange-primary font-semibold text-lg border-b-4 border-orange-primary">
              COMMITTED <span className="font-extrabold">Biiggies</span>
            </h2>
          </div>
          <div className="p-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {profileBiiggiesCommittedToCards}
          </div>
          {mappedLikes.length !== 0 ? (
            <div>
              <div className="text-left">
                <h2 className="pt-10 text-orange-primary font-semibold text-lg border-b-4 border-orange-primary">
                  Liked <span className="font-extrabold">Biiggies</span>
                </h2>
              </div>
              <div className="p-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {mappedLikes}
              </div>
            </div> 
        ): null}
      </div>

    </div>
    </div>
  );
};
export default Profile;
