import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
// import Auth from '../utils/auth';
import { ADD_USER } from "../../utils/mutations";
import Auth from '../../utils/auth.js'
import { Link } from "react-router-dom";


function Signup(props) {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // 
    try {
      const mutationResponse = await addUser({
        variables: {
          ...formState,
        },
      });
      console.log(mutationResponse)
      const token = mutationResponse.data.newUser.token;
      Auth.login(token);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="bg-body-background-blue min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
      {/* <Link to="/login">← Go to Login</Link> */}

      <h1 class="mb-8 text-3xl text-center font-bold">Sign Up</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
        <label htmlFor="firstName"></label>
          <input
            class="block border border-grey-light w-full p-3 rounded mb-4"
            placeholder="First Name"
            name="firstName"
            type="text"
            id="firstName"
            onChange={handleChange}
          />
        <label htmlFor="lastName"></label>
          <input
            class="block border border-grey-light w-full p-3 rounded mb-4"
            placeholder="Last Name"
            name="lastName"
            type="text"
            id="lastName"
            onChange={handleChange}
          />
          <label htmlFor="username"></label>
          <input
            class="block border border-grey-light w-full p-3 rounded mb-4"
            placeholder="Username"
            name="username"
            type="text"
            id="username"
            onChange={handleChange}
          />
          <label htmlFor="email"></label>
          <input
            class="block border border-grey-light w-full p-3 rounded mb-4"
            placeholder="Email"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
          <label htmlFor="pwd"></label>
          <input
            class="block border border-grey-light w-full p-3 rounded mb-4"
            placeholder="Password"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
          {/* <input 
            class="block border border-grey-light w-full p-3 rounded mb-4"
            placeholder="Confirm Password"
            name="confirm_password"
            type="password"
            id="pwd"
            onChange={handleChange}/> */}
        <button
            type="submit"
            class="bg-orange-primary hover:bg-orange-hover text-white font-bold py-3 my-1 rounded text-center w-full"
            >Create Account</button>
        </div>
      </form>
      <div class="text-grey-dark mt-6">
            Already have an account?&nbsp;
            <Link class="no-underline border-b text-orange-primary" to="/login">
            Log in
            </Link>.
      </div>
    </div>
  </div>
  </div>
  );
}

export default Signup;
