import { useQuery } from "@apollo/client";
// gql -> to make query
// useQuery -> use in component to get data
import { GET_CLIENT } from "../queries/clientQueries";
import ClientRow from "./ClientRow";
import Spinner from "./Spinner";

export default function Client() {
    // This is where we run useQuery and get data in return
    // console.log(useQuery(GET_CLIENT));
    const { loading, error, data } = useQuery(GET_CLIENT);
    // console.log(data);

    if (loading) return <Spinner />;
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
