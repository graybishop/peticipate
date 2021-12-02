const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        firstName: String!
        lastName: String
        createdBiiggies: [Biiggie]
    }

    type Auth {
        token: ID!
        user: User
    }

    type HelpOption{
        name: String
        description: String
        numOfPeople: Int
        registeredUsers: [User]
        moneyRequested: Int
        moneyReceived: Int
        biiggie: Biiggie
    }

    type Comment {
        author: User
        title: String
        body: String!
        biiggie: Biiggie
        thread: [Comment]
    }

    type Biiggie {
        title: String
        deadline: Float
        description: String
        sources: [String]
        images: [String]
        helpOptions:[HelpOption]
        comments: [Comment]
    }
    
    type Query {
        user(_id: String): User
        biiggies: [Biiggie]
        authBiggiesReq: [Biiggie]
    }

    type Mutation {
        newUser(username: String, password: String, email: String, firstName: String!, lastName: String): Auth
        login(username: String!, password: String!): Auth
    }
    `;

    module.exports = typeDefs;
