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