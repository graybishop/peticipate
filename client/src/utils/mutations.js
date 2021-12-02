import { gql } from "@apollo/client";

export const CREATE_BIIGGIE = gql`
  mutation createBiiggie(
    $title: String!
    $deadline: Float!
    $description: String!
    $sources: [String]
    $images: [String]
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
