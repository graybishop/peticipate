const { gql } = require('apollo-server-express');

// const { GraphQLScalarType, Kind } = require('graphql')

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        firstName: String
        lastName: String
        createdBiiggies: [Biiggie]
        image: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type HelpOption {
        _id: ID
        name: String
        description: String
        numOfPeople: Int
        registeredUsers: [User]
        moneyRequested: Int
        moneyReceived: Int
        biiggie: Biiggie
    }

    input HelpOptionContent {
        name: String
        description: String
        numOfPeople: Int
        moneyRequested: Int
        moneyReceived: Int
    }

    type Comment {
        author: User
        body: String!
    }

    type Biiggie {
        _id: ID
        title: String
        likes: Int
        deadline: Float!
        description: String
        sources: [String]
        images: [String]
        keywords: [Keywords]
        helpOptions:[HelpOption]
        comments: [Comment]
        createdBy: User
    }

    input BiiggieContent {
        title: String
        deadline: Float!
        description: String
        sources: [String]
        images: [String]
    }

    type Keywords {
        keyword: String
        biiggie: [Biiggie]
    }
    
    type Query {
        user(_id: String): User
        biiggie(_id: ID): Biiggie
        biiggies: [Biiggie]
        authBiggiesReq: [Biiggie]
        keywords: [Keywords]
        me: User
    }

    type Mutation {
        createBiiggie(title: String!, deadline: Float!, description: String!, sources: [String], images: [String], helpOptions: [HelpOptionContent]): Biiggie
        newUser(username: String!, password: String!, email: String!, firstName: String!, lastName: String!, image:String): Auth
        login(username: String!, password: String!): Auth
        commitToHelp(helpOptionId: ID!, moneyCommitted: Int): HelpOption
        addComment(body: String!, biiggieId: ID!): Biiggie
    }
    `;

    module.exports = typeDefs;
