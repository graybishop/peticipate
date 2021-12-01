const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        createdBiiggies: [Biiggie]
    }

    type HelpOptions{
        name: String
        description: String
        numOfPeople: Int
        contributor: [User]
        biiggie: [Biiggie]
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

    type Mutation {
        newUser(username: String, password: String, email: String): User
    }
    `;

    module.exports = typeDefs;
