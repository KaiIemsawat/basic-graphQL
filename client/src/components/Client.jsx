import { gql, useQuery } from "@apollo/client";
import ClientRow from "./ClientRow";
// gql -> to make query
// useQuery -> use in component to get data

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

export default function Client() {
    // This is where we run useQuery and get data in return
    // console.log(useQuery(GET_CLIENT));
    const { loading, error, data } = useQuery(GET_CLIENT);
    // console.log(data);

    if (loading) return <p>Loading....</p>;
    if (error) return <p>Error occur somewhere....</p>;

    return (
        <>
            {!loading && !error && (
                <table className="table table-hover mt-3">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.clients.map((client) => (
                            <ClientRow key={client.id} client={client} />
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
}
