import Home from "./pages/HomePage/index.js";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/index.js";
import Signup from "./pages/Signup/index.js";
import Header from "./components/PageComponents/Header.js";
import { NewBiiggieForm } from "./components/PageComponents/NewBiiggieForm.js";

const client = new ApolloClient({
  uri: "/graphql",
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
