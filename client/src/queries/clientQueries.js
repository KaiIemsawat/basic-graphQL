import { gql } from "@apollo/client";

// * A couple notes for using GraphQL
// use backtick not parentheses
// use the same one the was used in browserinside 'query getClient {}
const GET_CLIENT = gql`
    query getClient {
        clients {
            name
            id
            phone
            email
        }
    }
`;

export { GET_CLIENT };
