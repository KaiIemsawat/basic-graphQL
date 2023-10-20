import { gql } from "@apollo/client";

// * A couple notes for using GraphQL
// use backtick '`' not parentheses
// the syntax is different from Query

const ADD_CLIENT = gql`
    mutation addClient($name: String!, $email: String!, $phone: String!) {
        addClient(name: $name, email: $email, phone: $phone) {
            id
            name
            email
            phone
        }
    }
`;

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
export { ADD_CLIENT, DELETE_CLIENT };
