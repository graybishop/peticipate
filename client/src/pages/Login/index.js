import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations.js';
import Auth from '../../utils/auth.js'
import { Link, useNavigate } from "react-router-dom";
import { FiAlertCircle } from 'react-icons/fi';

function Login({setLoggedIn}) {
  const [formState, setFormState] = useState({ username: "", password: "" });
  let navigate = useNavigate();

  const [loginMutation] = useMutation(LOGIN_USER);

  const [errorMessage, setErrorMessage] = useState('');

  
  useEffect(() => {
    document.title='Login';
  }, [])

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
      setLoggedIn(true)
      navigate(-1)
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

  const handleClick = () => {
    setErrorMessage('Incorrect Username or Password');
  }

  return (
    <div className="bg-body-background-blue min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
      {/* <Link to="/login">← Go to Login</Link> */}

      <h1 className="mb-8 text-3xl text-center font-bold">Login</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="">
          <label htmlFor="username"></label>
          <input
            className="block border border-grey-light w-full p-3 rounded mb-4"
            placeholder="Username"
            name="username"
            type="username"
            id="username"
            onChange={handleChange}
          />
          <label htmlFor="pwd"></label>
          <input
            className="block border border-grey-light w-full p-3 rounded mb-4"
            placeholder="Password"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        <button onClick={handleClick}
            type="submit"
            className="bg-orange-primary hover:bg-orange-hover text-white font-bold py-3 my-1 rounded text-center w-full"
            >Login</button>
            {errorMessage && <div className="text-red-500 italic text-sm text-center border-red-500 border p-2 bg-red-50 rounded m-2"><FiAlertCircle className="inline"/> {errorMessage} </div>}
        </div>
      </form>
      <div className="text-grey-dark mt-6">
            Not Registered?&nbsp;  
            <Link className="no-underline border-b text-orange-primary" to="/sign-up" replace>
            Sign up
            </Link>.
      </div>
    </div>
  </div>
  </div>
  );
}

export default Login;
