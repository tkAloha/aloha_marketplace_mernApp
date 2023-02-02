import React from "react";
import defaultProfileImage from "../../../../assets/images/defaultProfile.png";
import parse from "html-react-parser";
import "./LeftSection.scss";

const defaultProjects = [
  {
    name: "Project One",
    desc: "I was brought on board to help design the Software Management Product, Faronics Deploy. This required a visual overhaul of the look and feel, streamlining of navigation, modular design principles, and a simplification of complex workflows, all, while catering for high level IT admins and new users alike.",
    skills: ["Skill 1", "Skill 2", "Skill 3"],
  },
  {
    name: "Project two",
    desc: "I was brought on board to help design the Software Management Product, Faronics Deploy. This required a visual overhaul of the look and feel, streamlining of navigation, modular design principles, and a simplification of complex workflows, all, while catering for high level IT admins and new users alike.",
    skills: ["Skill 1", "Skill 2"],
  },
];

const LeftSection = ({ profile }) => {
  const { role, description, image, projects, capabilities:{communication,comprehension,projectManagement,problemSolving,quantitativeAbility} } = profile;
  const capabilitiesString=communication.toString() + comprehension + projectManagement + problemSolving + quantitativeAbility;

  return (
    <div className="leftSection">
      <div className="intro category">
              <img className="profile-img" src={`/uploads/${profile.image}`} alt="" />
        <div>
          <h3 className="role">{role ? role : <span>Role</span>}</h3>
          <p>{description ? description :null}</p>
        </div>
      </div>
      <div className="capabilities category">
        <h3>capabilities</h3>
        <hr />
        <img
          className="capabilities-img"
          src={capabilitiesString === "00000"?require(`../../../../assets/images/AllDevGraphs/33333.png`):require(`../../../../assets/images/AllDevGraphs/${capabilitiesString}.png`)}
          alt="camel-chart"
        />
      </div>
      <div className="projects category">
        <h3>projects</h3>
        <hr />

        {(projects[0].name !== "" && projects[0].desc !== "" && projects[0].skills.length !== 0)
          ? projects.map((project) => {
              return (
                <div className="project" key={project._id}>
                  <h3 className="title">{project.name}</h3>
                  <p className="desc">{parse(`${project.desc}`)}</p>
                  <div className="skills tags">
                    {project.skills.map((skill,index) => {
                      return <span className="tag" key={index}>{skill}</span>;
                    })}
                  </div>
                </div>
              );
            })
          : defaultProjects.map((project, index) => {
              return (
                <div className="project" key={index}>
                  <h4 className="title">{project.name}</h4>
                  <p className="desc">{project.desc}</p>
                  <div className="skills tags">
                    {project.skills.map((skill, index) => {
                      return (
                        <span className="tag" key={index}>
                          {skill}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default LeftSection;
