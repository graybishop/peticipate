import { gql } from '@apollo/client';

export const GET_BIIGIES = gql`
query GiveMeTheBiiggies {
  biiggies {
    _id
    title
    deadline
    description
    sources
    images
    createdBy{
      _id
      firstName
      lastName
      username
      image
    }
    helpOptions {
      name
      description
      numOfPeople
      moneyReceived
      moneyRequested
      registeredUsers{
        _id
      }
    }
  }
}
`

export const AUTH_BIGGIES = gql`
query AuthBiggiesReq {
  authBiggiesReq {
    title
    deadline
    description
  }
}
`
export const BIIGGIE = gql`
query Biiggie($id: ID) {
  biiggie(_id: $id) {
    _id
    title
    deadline
    description
    sources
    images
    createdBy{
      _id
      username
      firstName
      lastName
      image
    }
    keywords {
      keyword
    }
    helpOptions {
      _id
      name
      description
      numOfPeople
      registeredUsers {
        _id
        username
      }
      moneyRequested
      moneyReceived
    }
    comments {
      author {
        username
      }
      body
    }
  }
}
`

export const QUERY_ME = gql`
query Query {
  me {
    _id
    username
    email
    firstName
    lastName
    firstName
    image
    createdBiiggies {
      _id
      title
      deadline
      description
      sources
      images
      helpOptions {
        name
        description
        numOfPeople
        moneyRequested
        moneyReceived
      }
    }
  }
}
`;