import React from "react";
import defaultAboutme from "../../../../assets/images/defaultAboutme.png";
import defaultSkillset from "../../../../assets/images/defaultSkillset.png";
import defaultGmvs from "../../../../assets/images/defaultGmvs.png";
import BarChart from "./BarChart/BarChart";
import "./RightSection.scss";
import moment from "moment";
import VideoComponent from "./VideoComponent/VideoComponent";

const RightSection = ({ profile }) => {
  
  const {
    availability,
    availabilityDate,
    proficiency,
    totalExp,
    skills,
    additionalSkills,
    aboutmeVideo,
    mySkillsetVideo,
    myGmvsVideo
  } = profile;

  const defaultAddSkills = ["Skill 1", "Skill 2", "Skill 3"];

  return (
    <div className="rightSection">
      <div className="category">
        <h3>Availability</h3>
        <hr />
        <div className="available">
          <p className="availability">
            {availability ? availability : <span>Full Time</span>}
          </p>
          <p className="availability-date">
            Qualified to join from{" "}
            {availabilityDate ? (
              moment.utc(availabilityDate, "YYYY-MM-DD").format("MMMM Do, YYYY")
            ) : (
              <span>....</span>
            )}
          </p>
        </div>
      </div>
      <div className="proficiency category">
        <h3>Proficiency</h3>
        <hr />
        <p>{proficiency}%</p>
      </div>
      <div className="experience category">
        <h3>Total experience</h3>
        <hr />
        <p><span>{totalExp} years</span>  of Software development experience</p>
      </div>
      <div className="skills category">
        <h3>Skills</h3>
        <hr />
        <BarChart skills={skills} width={450} height={400} />
      </div>
      <div className="additional-skills">
        <h3>Additional Skills</h3>
        <div className="tags">
          {(additionalSkills?.length !== 0
            ? additionalSkills
            : defaultAddSkills
          ).map((skill,index) => {
            return <p className="tag" key={index}>{skill}</p>;
          })}
        </div>
      </div>
      {aboutmeVideo.link !== "" ? (
        <VideoComponent videoCategory={aboutmeVideo} defaultImg={defaultAboutme} heading="about me"/>
      ) : null}
      {mySkillsetVideo.link !== "" ? (
        <VideoComponent videoCategory={mySkillsetVideo} defaultImg={defaultSkillset} heading="my skillset"/>
      ) : null}
      {myGmvsVideo.link !== "" ? (
        <VideoComponent videoCategory={myGmvsVideo} defaultImg={defaultGmvs} heading="my Gmvs"/>
      ) : null}
    </div>
  );
};

export default RightSection;
