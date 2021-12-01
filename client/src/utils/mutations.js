import { gql } from "@apollo/client";

export const CREATE_BIIGGIE = gql`
  mutation createBiiggie(
    $title: String!
    $deadline: Int!
    $description: String!
    $sources: [String]
    $images: String
  ) {
    createBiiggie(
      title: $title
      deadline: $deadline
      description: $description
      sources: $sources
      images: $images
    ) {
      _id
      title
      deadline
      description
      sources
      images
    }
  }
`;

export const ADD_USER = gql`
  mutation Mutation(
    $firstName: String!
    $lastName: String
    $email: String
    $password: String
    $username: String
  ) {
    newUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      username: $username
    ) {
      username
      email
      firstName
      lastName
    }
  }
`;


export const LOGIN_USER = gql`mutation Login($password: String!, $username: String!) {
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
}`