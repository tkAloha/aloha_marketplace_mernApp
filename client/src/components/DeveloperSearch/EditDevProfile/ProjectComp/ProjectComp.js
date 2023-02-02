import ReactQuill from "react-quill";
import "../EditDevProfile.scss";
import { MdOutlineDeleteOutline } from "react-icons/md";

const ProjectsComponent = ({
  project,
  index,
  deleteProject,
  onProjectsChange,
  errors,
}) => {
  return (
    <div className="category project" key={index}>
      <div className="header">
        <h3>{`Project ${index + 1}`}</h3>
        {index !== 0 ? (
          <button
            type="button"
            className="delete-icon"
            onClick={() => {
              deleteProject(index);
            }}
          >
            <MdOutlineDeleteOutline />
          </button>
        ) : (
          <p className="error">{errors?.required}</p>
        )}
      </div>
      <hr />

      <div className="input-field">
        <label htmlFor={`name ${index}`}>Project Name</label>
        <input
          type="text"
          value={project.name}
          id={`name ${index}`}
          placeholder="Name of the project"
          onChange={(event) => {
            onProjectsChange(event, index, "name");
          }}
        />
        <p className="error">{errors?.name}</p>
      </div>
      <div className="input-field">
        <label htmlFor={`desc ${index}`}>Project Description</label>
        <ReactQuill
          className="text-editor-color quill-description"
          value={project.desc}
          id={`desc ${index}`}
          placeholder="Description about the project"
          onChange={(event) => {
            onProjectsChange(event, index, "desc");
          }}
        />
        <p className="error">{errors?.desc}</p>
        <div className="input-field">
          <label htmlFor={`skills ${index}`}>
            Project Skills (Comma seperated){" "}
          </label>
          <input
            type="text"
            value={project.skills}
            id={`skills ${index}`}
            placeholder="skill 1, skill 2, skill 3 ...."
            onChange={(event) => {
              onProjectsChange(event, index, "skills");
            }}
          />
          <p className="error">{errors?.skills}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectsComponent;
