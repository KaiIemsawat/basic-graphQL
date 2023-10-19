import { gql } from "@apollo/client";

// * A couple notes for using GraphQL
// use backtick '`' not parentheses
// the syntax is different from Query
const DELETE_CLIENT = gql`
    mutation deleteClient($id: ID!) {
        deleteClient(id: $id) {
            id
            name
            email
            phone
        }
    }
`;
export { DELETE_CLIENT };
