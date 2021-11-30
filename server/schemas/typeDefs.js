const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
    }

    type Query {
        user: User
        biiggie: [Biiggie]
    }

    type Biiggie {
        title: String
        deadline: Date
        description: String
        sources: Array
        images: String
        helpOptions: [helpOption]!
    }
    `;

    module.exports = typeDefs;