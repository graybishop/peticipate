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
        helpOptions:[HelpOptions]
        comments: [Comment]
    }
    
    type Query {
        me: User
        biiggies: [Biiggie]
        keywords: [keyword]
        categories: [category]
    }
    `;

    module.exports = typeDefs;
