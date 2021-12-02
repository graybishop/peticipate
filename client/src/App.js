import Home from "./pages/HomePage/index.js";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Profile from "./pages/ProfilePage/index.js";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});



function App() {
  return (
    <ApolloProvider client={client}>
      <Home/>
      <Profile/>
    </ApolloProvider>
  );
}

export default App;
