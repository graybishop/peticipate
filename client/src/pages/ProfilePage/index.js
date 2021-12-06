import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME, GET_BIIGIES } from "../../utils/queries";
import ProfileBiiggieCard from "./ProfileBiiggieCard.js";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import auth from '../../utils/auth';

const Profile = () => {
  let navigate = useNavigate();
  useEffect(() => {
    if (!auth.loggedIn()) {
      navigate('/login');
    }
  });

  useEffect(() => {
    document.title='Profile';
  }, [])

  const { loading, data } = useQuery(QUERY_ME);
  const user = data?.me || data?.user || {};

  const { loading: loadingBiiggies, data: biiggiesData } = useQuery(GET_BIIGIES);
  const biiggies = biiggiesData?.biiggies || [];

  let profileBiiggieCards = 
  <p>Created Biiggies will display here...</p>;
  console.log(data);

  let profileBiiggiesCommittedToCards = 
    <p>Biiggies you commit to will show up here...</p>

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
      return <ProfileBiiggieCard biiggie={item} key={item._id} />
    });
  }

  // let profileBiiggieCards = user.CreatedBiiggies.map((item) => {
  //   return <ProfileBiiggieCard biiggie={item} key={item._id} />;
  // });

  return (
    <div className="text-center box-border p-4 border-4 m-4 mx-auto">
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
      {/* <div>{user.description}</div> */}
      {/* <div>{user.createdBiiggies}</div> */}
      <div>
        <div className="text-left">
          <p className="pt-10 text-orange-primary font-semibold text-lg border-b-4 border-orange-primary">
            CREATED <span className="font-extrabold">Biiggies</span>
          </p>
        </div>
        <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {/* <!--Card 1--> */}
          {/* if (loading) { return (<p>Loading ...</p>)} */}
          {/* Renders the users biiggies */}
          {profileBiiggieCards}
        </div>
        <div className="text-left">
          <p className="pt-10 text-orange-primary font-semibold text-lg border-b-4 border-orange-primary">
            COMMITTED <span className="font-extrabold">Biiggies</span>
          </p>
        </div>
        <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {/* <!--Card 1--> */}
          {/* if (loading) { return (<p>Loading ...</p>)} */}
          {/* Renders the users biiggies */}
          {profileBiiggiesCommittedToCards}
        </div>
      </div>
      <Link
        to="/new-biiggie"
        className="bg-orange-primary text-white p-4 rounded-lg shadow font-semibold text-lg text-center hover:bg-orange-hover"
      >
        Build My <span className="font-extrabold">Biiggie</span> Now
      </Link>
    </div>
  );
}
export default Profile;
