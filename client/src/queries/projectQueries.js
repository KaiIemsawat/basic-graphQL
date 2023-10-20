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

export { GET_PROJECTS };
