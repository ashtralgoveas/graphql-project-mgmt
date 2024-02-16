import projectLogo from "./assets/projectLogo.png";
import AddClientModal from "./AddClientModal";
import AddProjectModal from "./AddProjectModal";

export default function Header() {
  return (
    <nav className="navbar gradient-div mb-5 p-0 py-3">
      <div className="container ">
        <a className="navbar-brand" href="/">
          <div className="d-flex">
            <div>
              <img src={projectLogo} alt="projectLogo" height="60" />
              Project Pulse
            </div>
          </div>
        </a>
        <div className="d-flex gap-3">
          <AddClientModal />
          <AddProjectModal />
        </div>
      </div>
    </nav>
  );
}
