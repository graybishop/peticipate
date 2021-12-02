const { ApolloServer } = require("apollo-server-express");
const express = require('express');
const morgan = require("morgan");
const path = require('path');
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas/index.js');
const { authMiddleware } = require("./utils/index.js");

console.log('This is the server file')

const server = new ApolloServer(
  {
    typeDefs,
    resolvers,
    context: authMiddleware
  }
)

const app = express()
const PORT = process.env.PORT || 3001;

const serverStart = async () => {
  await server.start();
  server.applyMiddleware({ app });
};

serverStart();

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Now listening on http://localhost:${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  }
  );
})