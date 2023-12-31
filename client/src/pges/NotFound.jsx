import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center mt-5">
            <FaExclamationTriangle className="text-danger" size="5rem" />
            <h1>404</h1>
            <p className="lead">Oops.... page can't be found</p>
            <Link to="/" className="btn btn-primary">
                Back Home
            </Link>
        </div>
    );
}
