import { gql } from "@apollo/client";

const GET_PROJECTS = gql`
    query getProject {
        projects {
            id
            name
            status
        }
    }
`;

const GET_PROJECT_BY_ID = gql`
    query getProject($id: ID!) {
        project(id: $id) {
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

export { GET_PROJECTS, GET_PROJECT_BY_ID };
