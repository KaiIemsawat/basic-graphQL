import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useQuery } from "@apollo/client";
import { GET_PROJECT_BY_ID } from "../queries/projectQueries";
import ClientInfo from "../components/ClientInfo";
import DeleteProjectButton from "../components/DeleteProjectButton";
import EditProjectForm from "../components/EditProjectForm";

export default function Project() {
    const { id } = useParams();

    const { loading, error, data } = useQuery(GET_PROJECT_BY_ID, {
        variables: { id },
    });

    if (loading) return <Spinner />;
    if (error) return <p>Something went wrong in Project Page</p>;

    return (
        <>
            {!loading && !error && (
                <div className="mx-auto w-75 card p-5">
                    <Link to="/" className="btn btn-primary ms-auto ">
                        Home
                    </Link>
                    <h1>{data.project.name}</h1>
                    <p>{data.project.description}</p>
                    <h5 className="mt-3">Project Status</h5>
                    <p className="lead">{data.project.status}</p>
                    <ClientInfo client={data.project.client} />
                    <EditProjectForm project={data.project} />
                    <DeleteProjectButton projectId={data.project.id} />
                </div>
            )}
        </>
    );
}
