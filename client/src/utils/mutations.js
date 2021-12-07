import { gql } from "@apollo/client";

export const CREATE_BIIGGIE = gql`
  mutation Mutation(
    $title: String!
    $deadline: Float!
    $description: String!
    $sources: [String]
    $images: [String]
    $helpOptions: [HelpOptionContent]
  ) {
    createBiiggie(
      title: $title
      deadline: $deadline
      description: $description
      sources: $sources
      images: $images
      helpOptions: $helpOptions
    ) {
      title
      deadline
      description
      _id
    }
  }
`;

export const ADD_USER = gql`
  mutation Mutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $username: String!
  ) {
    newUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      username: $username
    ) {
      token
      user {
        email
        firstName
        lastName
        username
        _id
        createdBiiggies {
          title
          deadline
          description
          sources
          images
          helpOptions {
            name
          }
        }
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($password: String!, $username: String!) {
    login(password: $password, username: $username) {
      token
      user {
        email
        firstName
        lastName
        username
        _id
        createdBiiggies {
          title
          deadline
          description
          sources
          images
          helpOptions {
            name
          }
        }
      }
    }
  }
`;

export const USER_COMMIT_TO_HELP = gql`
  mutation Mutation($helpOptionId: ID!, $moneyCommitted: Int) {
    commitToHelp(helpOptionId: $helpOptionId, moneyCommitted: $moneyCommitted) {
      name
      description
      numOfPeople
      registeredUsers {
        _id
      }
      moneyReceived
      moneyRequested
    }
  }
`;


export const ADD_COMMENT = gql`
mutation Mutation($body: String!, $biiggieId: ID!) {
  addComment(body: $body, biiggieId: $biiggieId) {
    _id
    title
    comments {
      author {
        username
        _id
      }
      body
    }
  }
}
`
export const ADD_LIKE = gql`
mutation Mutation($biiggieId: ID!) {
  addLike(biiggieId: $biiggieId) {
    _id
    username
    liked {
      _id
    }
  }
}
`