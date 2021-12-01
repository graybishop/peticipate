import { gql } from '@apollo/client';

export const GET_BIIGIES = gql`
query lmnop {
  user {
    _id
    username
    email
    password
  }
}
`