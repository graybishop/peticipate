import Home from "./pages/HomePage/index.js";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/index.js";
import Signup from "./pages/Signup/index.js";
import Header from "./components/PageComponents/Header.js";
import { NewBiiggieForm } from "./components/PageComponents/NewBiiggieForm.js";
import TestPage from "./pages/TestPage/index.js";
import { setContext } from '@apollo/client/link/context';

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
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/new-biiggie" element={<NewBiiggieForm />} />
          <Route path="/test" element={<TestPage />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p className='text-red-700 text-3xl'>404 There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
