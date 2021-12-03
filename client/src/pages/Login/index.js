import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations.js';
import Auth from '../../utils/auth.js'
import { Link } from "react-router-dom";

function Login(props) {
  const [formState, setFormState] = useState({ username: "", password: "" });

  const [loginMutation] = useMutation(LOGIN_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await loginMutation({
        variables: {
          username: formState.username,
          password: formState.password,
        },
      });
      console.log(mutationResponse)
      const token = mutationResponse.data.login.token;
      Auth.login(token);    
    } catch (error) {
      console.error(error)
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
    <div className="bg-gray-300 min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
      {/* <Link to="/login">← Go to Login</Link> */}

      <h1 class="mb-8 text-3xl text-center font-bold">Login</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="">
          <label htmlFor="username"></label>
          <input
            class="block border border-grey-light w-full p-3 rounded mb-4"
            placeholder="Username"
            name="username"
            type="username"
            id="username"
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
        <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 my-1 rounded text-center w-full"
            >Login</button>
        </div>
      </form>
      <div class="text-grey-dark mt-6">
            Not Registered?  
            <Link class="no-underline border-b border-blue text-blue-600" to="/sign-up">
            Sign up
            </Link>.
      </div>
    </div>
  </div>
  </div>
  );
}

export default Login;
