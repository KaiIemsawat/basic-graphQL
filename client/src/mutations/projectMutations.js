import { gql } from "@apollo/client";

const ADD_PROJECT = gql`
    mutation addProject(
        $name: String!
        $description: String!
        $status: ProjectStatus!
        $clientId: ID!
    ) {
        addProject(
            name: $name
            description: $description
            status: $status
            clientId: $clientId
        ) {
            id
            name
            description
            status
            client {
                id
                name
                email
                phone
            }
        }
    }
`;

const DELETE_PROJECT = gql`
    mutation deleteProject($id: ID!) {
        deleteProject(id: $id) {
            id
            name
        }
    }
`;

export { ADD_PROJECT, DELETE_PROJECT };

// * 'ProjectStatus' comes from 'server/schema/schema.js' (enum)
