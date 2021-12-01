import Home from "./pages/HomePage/index.js";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});



function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
      <div>
        <p>this will always stay</p>
      </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
