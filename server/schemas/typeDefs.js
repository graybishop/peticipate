const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        createdBiiggies: [Biiggie]
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
        me: User
        user: User
        biiggies: [Biiggie]
    }
    `;

    module.exports = typeDefs;
