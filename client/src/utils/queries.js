import { gql } from '@apollo/client';

export const GET_BIIGIES = gql`
query GiveMeTheBiiggies {
  biiggies {
    title
    deadline
    description
    sources
    images
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