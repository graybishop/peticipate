import Home from "./pages/HomePage/index.js";
import React, { useEffect, useState } from "react";

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/index.js";
import Signup from "./pages/Signup/index.js";
import Header from "./components/PageComponents/Header.js";
import Footer from "./components/PageComponents/Footer.js";
import TestPage from "./pages/TestPage/index.js";
import { setContext } from '@apollo/client/link/context';
import Profile from "./pages/ProfilePage/index.js";
import BiiggiePage from "./pages/Biiggie Page/index.js";
import DemoForm from "./pages/DemoForm/index.js";
import auth from "./utils/auth";

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});



function App() {
  let [loggedIn, setLoggedIn] = useState(false)

  useEffect(()=>{
    setLoggedIn(auth.loggedIn())
  },[])


  return (
    <ApolloProvider client={client}>
      <div className='flex flex-col min-h-screen'>
      <BrowserRouter>
        <Header loggedIn={loggedIn}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn}/>} />
          <Route path="/sign-up" element={<Signup setLoggedIn={setLoggedIn}/>} />
          <Route path="/new-biiggie" element={<DemoForm />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/biiggie/" element={<BiiggiePage />} />
          <Route path="/biiggie/:biiggieId" element={<BiiggiePage />} />
          <Route
            path="*"
            element={
              <main className='container mx-auto p-4 flex flex-row justify-center py-56'>
                <p className='text-red-700 text-5xl'>404 - There's no react router route to get here!</p>
                <p className='text-red-700 text-5xl'> 💩</p>
              </main>
            }
          />
        </Routes>
        <Footer/>
      </BrowserRouter>
      </div>
    </ApolloProvider>
  );
}

export default App;
