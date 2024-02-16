export default function ProjectCard({ project }) {
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
  return (
    <div className="col-lg-4 col-md-6">
      <div className="card mb-3 shadow p-3 mb-5 bg-white rounded">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title text-color">{project.name}</h5>
            <a
              className="btn btn-light view-btn"
              href={`/projects/${project.id}`}
            >
              View
            </a>
          </div>
          <p className="small">
            Status:{" "}
            <strong className={getColor(project.status)}>
              {project.status}
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
}
