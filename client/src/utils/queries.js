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
    }
    helpOptions {
      name
      description
      numOfPeople
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
    keywords {
      keyword
    }
    helpOptions {
      name
      description
      numOfPeople
      registeredUsers {
        username
      }
      moneyRequested
      moneyReceived
    }
    comments {
      author {
        username
      }
      title
      body
      thread {
        body
      }
    }
  }
}
`

export const QUERY_ME = gql`
query Me {
  me {
    username
    _id
    email
    lastName
    createdBiiggies {
      _id
      title
    }
  }
}
`;