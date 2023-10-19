import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENT } from "../queries/clientQueries";

export default function ClientRow({ client }) {
    // To use 'useMutation()', need square brackets
    // the value in the brackets '[value]' will be used in onClick -> 'onClick={value}'
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: {
            id: client.id,
        },
        // this next line will re-fetch and the display will show the update table after delete
        // refetchQueries: [{ query: GET_CLIENT }],

        // thses next lines will query the data from cache and filter out the id that is match to the deleted id
        // Then, need to create 'InMemoryCache()' function in 'App.js'
        update(cache, { data: { deleteClient } }) {
            const { clients } = cache.readQuery({
                query: GET_CLIENT,
            });
            cache.writeQuery({
                query: GET_CLIENT,
                data: {
                    clients: clients.filter(
                        (client) => client.id !== deleteClient.id
                    ),
                },
            });
        },
    });

    return (
        <tr>
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>{client.phone}</td>
            <td>
                <button
                    className="btn btn-danger btn-sm"
                    onClick={deleteClient}
                >
                    <FaTrash />
                </button>
            </td>
        </tr>
    );
}
