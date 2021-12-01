import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations.js';
import Auth from '../../utils/auth.js'

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
    <div className="container my-1">
      {/* <Link to="/login">← Go to Login</Link> */}

      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="username">Username:</label>
          <input
            placeholder="MyAwesomeUsername123"
            name="username"
            type="username"
            id="username"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
