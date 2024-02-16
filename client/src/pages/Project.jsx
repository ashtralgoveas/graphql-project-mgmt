import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useQuery } from "@apollo/client";
import ClientInfo from "../components/ClientInfo";
import { GET_PROJECT } from "../components/queries/projectQueries";
import DeleteProjectButton from "../components/DeleteProjectButton";
import EditPropertyForm from "../components/EditPropertyForm";

export default function Project() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  const getColor = (status) => {
    switch (status) {
      case "In Progress":
        return "inProgressColor";
      case "Completed":
        return "completedColor";
      default:
        return "notStartedColor";
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
        <div className="mx-auto w-75 card p-5 shadow mb-5 bg-white rounded">
          <Link to="/" className="btn btn-light btn-sm ms-auto back-btn">
            Back
          </Link>

          <h1 className="text-color">{data.project.name}</h1>
          <p>{data.project.description}</p>

          <h5 className="mt-3">Project Status</h5>
          <p className={`lead ${getColor(data.project.status)}`}>
            {data.project.status}
          </p>

          <ClientInfo client={data.project.client} />

          <EditPropertyForm project={data.project} />

          <DeleteProjectButton projectId={data.project.id} />
        </div>
      )}
    </>
  );
}
