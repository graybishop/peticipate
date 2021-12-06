import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
// import Auth from '../utils/auth';
import { ADD_USER } from "../../utils/mutations";
import Auth from '../../utils/auth.js'
import { Link, useNavigate } from "react-router-dom";


function Signup({setLoggedIn}) {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  let navigate = useNavigate();
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
      setLoggedIn(true)
      navigate(-1)
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

  useEffect(() => {
    document.title='Sign-up';
  }, [])
  
  return (
    <div className="bg-body-background-blue min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
      {/* <Link to="/login">← Go to Login</Link> */}

      <h1 className="mb-8 text-3xl text-center font-bold">Sign Up</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
        <label htmlFor="firstName"></label>
          <input
            className="block border border-grey-light w-full p-3 rounded mb-4"
            placeholder="First Name"
            name="firstName"
            type="text"
            id="firstName"
            required
            onChange={handleChange}
          />
        <label htmlFor="lastName"></label>
          <input
            className="block border border-grey-light w-full p-3 rounded mb-4"
            placeholder="Last Name"
            name="lastName"
            type="text"
            id="lastName"
            onChange={handleChange}
          />
          <label htmlFor="username"></label>
          <input
            className="block border border-grey-light w-full p-3 rounded mb-4"
            placeholder="Username"
            name="username"
            type="text"
            id="username"
            required
            onChange={handleChange}
          />
          <label htmlFor="email"></label>
          <input
            className="block border border-grey-light w-full p-3 rounded mb-4"
            placeholder="Email"
            name="email"
            type="email"
            id="email"
            required
            onChange={handleChange}
          />
          <label htmlFor="pwd"></label>
          <input
            className="block border border-grey-light w-full p-3 rounded mb-4"
            placeholder="Password"
            name="password"
            type="password"
            id="pwd"
            required
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
            className="bg-orange-primary hover:bg-orange-hover text-white font-bold py-3 my-1 rounded text-center w-full"
            >Create Account</button>
        </div>
      </form>
      <div className="text-grey-dark mt-6">
            Already have an account?&nbsp;
            <Link class="no-underline border-b text-orange-primary" to="/login" replace>
            Log in
            </Link>.
      </div>
    </div>
  </div>
  </div>
  );
}

export default Signup;
