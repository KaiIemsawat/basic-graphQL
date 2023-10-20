import { FaEnvelope, FaPhone, FaIdBadge } from "react-icons/fa";

export default function ClientInfo({ client }) {
    let assignedClient = client ? (
        <>
            <FaIdBadge className="icon" /> {client.name}
        </>
    ) : (
        <>Have not been assigned</>
    );

    return (
        <>
            {client ? (
                <>
                    <h5 className="mt-3">Client Information</h5>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <FaIdBadge className="icon" /> {client.name}
                        </li>
                        <li className="list-group-item">{assignedClient}</li>
                        <li className="list-group-item">
                            <FaPhone className="icon" /> {client.phone}
                        </li>
                    </ul>
                </>
            ) : (
                <>
                    <h5 className="mt-3 text-warning">No Client Assigned</h5>
                </>
            )}
        </>
    );
}
