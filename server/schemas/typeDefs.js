const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
    }

    type HelpOptions{
        name: String
        description: String
        numOfPeople: Int
    }

    type Biiggie {
        title: String
        deadline: Float
        description: String
        sources: [String]
        images: [String]
        helpOptions:[HelpOptions]
    }
    
    type Query {
        user: User
        biiggies: [Biiggie]
    }
    `;

    module.exports = typeDefs;
