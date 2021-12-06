import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME, GET_BIIGIES } from "../../utils/queries";
import ProfileBiiggieCard from "./ProfileBiiggieCard.js";
import { Link } from "react-router-dom";

const Profile = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const user = data?.me || data?.user || {};

  const { loadingBiiggies, biiggiesData } = useQuery(GET_BIIGIES);
  const biiggies = biiggiesData?.biiggies || {};
  console.log(biiggies);
  let profileBiiggieCards = <p>Created Biiggies will display here...</p>;
  console.log(data);
  let profileBiiggieCommits = (
    <p>Biiggies you commit to will show up here...</p>
  );

  if (user.createdBiiggies != null) {
    profileBiiggieCards = user.createdBiiggies.map((item) => {
      return <ProfileBiiggieCard biiggie={item} key={item._id} />;
    });
  } else {
    return profileBiiggieCards;
  }

  // if ()

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
        <p className="pt-10 text-orange-primary font-semibold text-lg border-b-4 border-orange-primary">CREATED <span className="font-extrabold">Biiggies</span></p>
        </div>
        <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {/* <!--Card 1--> */}
          {/* if (loading) { return (<p>Loading ...</p>)} */}
          {/* Renders the users biiggies */}
          {profileBiiggieCards}
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
};
export default Profile;
