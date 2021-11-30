import { gql } from '@apollo/client';

export const CREATE_BIIGGIE = gql`
mutation createBiiggie(
    $title: String!,
    $deadline: Int!,
    $description: String!,
    $sources: [String],
    $images: String
    ) {
        createBiiggie(
            title: $title,
            deadline: $deadline,
            description: $description,
            sources: $sources,
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
`