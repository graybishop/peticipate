const { gql } = require('apollo-server-express');


// Temp Query for server testing
const typeDefs = gql`
    type User{
      message: String
    }

    type Query{
      user: User
    }
`
// Temp Query for server testing

module.exports = typeDefs