import { Link, useNavigate, useParams } from "react-router-dom";
import React, {  useEffect, useLayoutEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import "./EditDevProfile.scss";
import axios from "axios";
import Navbar from "../../Navbar/Navbar";
import { useProfileContext } from "../../../context/ProfileContext";
import { FiChevronRight } from "react-icons/fi";
import SkillComp from "./SkillComp/SkillComp";
import VideoComp from "./VideoComp/VideoComp";
import ProjectComp from "./ProjectComp/ProjectComp";
import useProfileValidation from "../../../hooks/useProfileValidation";
import CapabilitiesComp from "./CapabilitiesComp/CapabilitiesComp";
import { useAuthContext } from "../../../context/AuthContext";



const EditDevProfile = () => {
  const [error, setError] = useState(false);
  const [img,setImg]=useState("");
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { profile,dispatch: profileDispatch } = useProfileContext();
  const { id } = useParams();
  const minDate=new Date().toISOString().split('T')[0]
  
  const {
    formErrors,
    setFormErrors,
    nameValidation,
    roleValidation,
    availabilityValidation,
    availabilityDateValidation,
    proficiencyValidation,
    totalExpValidation,
    additionalSkillsValidation,
    projectsValidation,
    skillsValidation,
    capabilitiesValidation,
    
  } = useProfileValidation();

  //to set the form errors for skill and projects
  useLayoutEffect(() => {
    let skillsArr =[];
    formDetails.skills.forEach((item,index)=>{
  if(index === 0){
   skillsArr.push({name:"",value:"",required:""})
  }else {
   skillsArr.push({name:"",value:""})
  }
    })
    let projectsArr=[]
    formDetails.projects.forEach((item,index)=>{
      if(index === 0){
       projectsArr.push({name:"",desc:"",skills:"",required:""})
      }else {
       projectsArr.push({name:"",desc:"",skills:""})
      }
        })
    setFormErrors({...formErrors,skills:skillsArr,projects:projectsArr})
    
   }, []);


  
  const [formDetails, setFormDetails] = useState({
    name: profile.name,
    role: profile.role,
    image: profile.image,
    description: profile.description,
    totalExp: profile.totalExp,
    proficiency: profile.proficiency,
    availability: profile.availability,
    availabilityDate: profile.availabilityDate,
    skills: profile.skills,
    additionalSkills: profile.additionalSkills,
    projects: profile.projects,
    capabilities: profile.capabilities,
    aboutmeVideo: profile.aboutmeVideo,
    mySkillsetVideo: profile.mySkillsetVideo,
    myGmvsVideo: profile.myGmvsVideo,
  });

  //on all input change
  const onInputChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "totalExp" || e.target.name === "proficiency") {
      if(value !== ""){
        value = parseInt(e.target.value);
      }
    }
    setFormDetails({ ...formDetails, [e.target.name]: value });

    //calling name validation
    if (e.target.name === "name") {
      nameValidation(value);
    }

    //calling role validation
    if (e.target.name === "role") {
      roleValidation(value);
    }

    //calling availability validation
    if (e.target.name === "availability") {
      availabilityValidation(value);
    }

    //calling availabilityDate validation
    if (e.target.name === "availabilityDate") {
      availabilityDateValidation(value);
    }

    //calling proficiency validation
    if (e.target.name === "proficiency") {
      proficiencyValidation(value);
    }

    //calling total Experience validation
    if (e.target.name === "totalExp") {
      totalExpValidation(value);
    }
  };

  // on image change
  const onImageChange = (e) => {
    const imgBlob = URL.createObjectURL(e.target.files[0])
    setImg(imgBlob);
    setFormDetails({ ...formDetails, image: e.target.files[0] });
  };
  

  //on additional skills change
  const onAdditionalSkillsChange = (e) => {
    setFormDetails({
      ...formDetails,
      [e.target.name]: e.target.value.split(","),
    });
    //calling additional skills validation
    additionalSkillsValidation(e.target.value);
  };

  //on all capabilities change
  const onCapabilitesChange = (e) => {
    let value = parseInt(e.target.value);
    setFormDetails({
      ...formDetails,
      capabilities: {
        ...formDetails.capabilities,
        [e.target.name]: value,
      },
    });
    capabilitiesValidation({
      ...formDetails.capabilities,
      [e.target.name]: value,
    });
  };

  //Dynamic projects
  //deleting a project input fields
  const deleteProject = (index) => {
    setFormDetails({
      ...formDetails,
      projects: formDetails.projects.filter((project, curIndex) => {
        return curIndex !== index;
      }),
    });
    setFormErrors({
      ...formErrors,
      projects: formErrors.projects.filter((project, curIndex) => {
        return curIndex !== index;
      }),
    });
    const filteredProjectsError = formErrors.projects.filter((project, curIndex) => {
      return curIndex !== index;
    })
   
   
  };

  //adding a project input fields
  const addProject = () => {
    setFormDetails({
      ...formDetails,
      projects: [...formDetails.projects, { name: "", desc: "", skills: [] }],
    });
    setFormErrors({
      ...formErrors,
      projects: [...formErrors.projects, { name: "", desc: "", skills: "" }],
    });
   
  };

  //on project change
  const onProjectsChange = (event, index, inputName) => {
    const modifiedProjects = formDetails.projects.map((project, curIndex) => {
      if (curIndex !== index) {
        return { ...project };
      } else {
        if (inputName === "name") {
          return { ...project, name: event.target.value };
        } else if (inputName === "skills") {
          return { ...project, skills: event.target.value.split(",") };
        } else {
          //When the inputName is desc
          return { ...project, desc: event };
        }
      }
    });

    setFormDetails({
      ...formDetails,
      projects: modifiedProjects,
    });
    projectsValidation(modifiedProjects);
  };

  //Dynamic skills
  //adding a skill input field
  const addSkill = () => {
    setFormDetails({
      ...formDetails,
      skills: [...formDetails.skills, { name: "", value: 0 }],
    });
    setFormErrors({
      ...formErrors,
      skills: [...formErrors.skills, { name: "", value: "" }],
    });
    
  };

  //deleting a skill input field
  const deleteSkill = (index) => {
    setFormDetails({
      ...formDetails,
      skills: formDetails.skills.filter((skill, curIndex) => {
        return curIndex !== index;
      }),
      
    });
    const filteredSkillsError = formErrors.skills.filter((skill, curIndex) => {
      return curIndex !== index;
    })
    setFormErrors({
      ...formErrors,
      skills: filteredSkillsError
    });
    
  };

  //on skills change
  const onSkillsChange = (event, index) => {
    let value = event.target.value;
    if (event.target.name === "value") {
      value = parseInt(event.target.value);
    }

    const modifiedSkills = formDetails.skills.map((skill, curIndex) => {
      if (curIndex !== index) {
        return { ...skill };
      } else {
        return { ...skill, [event.target.name]: value };
      }
    });
    setFormDetails({
      ...formDetails,
      skills: modifiedSkills,
    });
    
    skillsValidation(modifiedSkills, formDetails.totalExp);
  };

  //on aboutme video change
  const onAboutmevideoChange = (e) => {
    setFormDetails({
      ...formDetails,
      aboutmeVideo: {
        ...formDetails.aboutmeVideo,
        [e.target.name]: e.target.value,
      },
    });
  };

  //on myskillset video change
  const onMyskillsetVideoChange = (e) => {
    setFormDetails({
      ...formDetails,
      mySkillsetVideo: {
        ...formDetails.mySkillsetVideo,
        [e.target.name]: e.target.value,
      },
    });
  };

  //on myGmvs video change
  const onMyGmvsVideoChange = (e) => {
    setFormDetails({
      ...formDetails,
      myGmvsVideo: {
        ...formDetails.myGmvsVideo,
        [e.target.name]: e.target.value,
      },
    });
  };


const goToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};
  //on form submit
  const handleSubmit = (e) => {
    
    e.preventDefault();
    //calling all validations
    nameValidation(formDetails.name);
    roleValidation(formDetails.role);
    availabilityValidation(formDetails.availability);
    availabilityDateValidation(formDetails.availabilityDate);
    proficiencyValidation(formDetails.proficiency);
    totalExpValidation(formDetails.totalExp);
    additionalSkillsValidation(formDetails.additionalSkills.join(""));
    projectsValidation(formDetails.projects);
    skillsValidation(formDetails.skills, formDetails.totalExp);
    capabilitiesValidation(formDetails.capabilities);
   
    const formData=new FormData();

    formData.append("name",formDetails.name)
    formData.append("role",formDetails.role)
    formData.append("description",formDetails.description)
    formData.append("image",formDetails.image)
    formData.append("totalExp",formDetails.totalExp)
    formData.append("proficiency",formDetails.proficiency)
    formData.append("availability",formDetails.availability)
    formData.append("availabilityDate",formDetails.availabilityDate)
    formData.append("additionalSkills",formDetails.additionalSkills)
    formData.append("capabilities",JSON.stringify(formDetails.capabilities))
    formData.append("aboutmeVideo",JSON.stringify(formDetails.aboutmeVideo))
    formData.append("mySkillsetVideo",JSON.stringify(formDetails.mySkillsetVideo))
    formData.append("myGmvsVideo",JSON.stringify(formDetails.myGmvsVideo))
    formData.append("projects",JSON.stringify(formDetails.projects))
    formData.append("skills",JSON.stringify(formDetails.skills))
    
    const updateProfile = async () => {
      try {
        const resProfile = await axios.patch(
          `/profiles/${id}`,
          formData,
          {
            headers: {
              'Authorization': `Bearer ${user.token}`,
              'content-type': 'multipart/form-data'
            },
          }
        );
        toast.success("Profile updated successfully!");
        navigate(`/dev/profile/${id}`);
        profileDispatch({
          type: "EDIT_PROFILE",
          payload: {...profile,...formDetails}
        });
        profileDispatch({
          type: "SET_SINGLE_PROFILE",
          payload: {...profile,...formDetails}
        });
      } catch (error) {
        console.log(error);
      }
    };
    const {
      name,
      role,
      totalExp,
      proficiency,
      availability,
      availabilityDate,
      skills,
      additionalSkills,
      projects,
      capabilities:{
        communication,
        comprehension,
        projectManagement,
        problemSolving,
        quantitativeAbility
      }
      }= formErrors
  
      setError(false)
    //check if there are no form errors than submit the form
      if(!name && !role && !totalExp && !proficiency && !availability && !availabilityDate && !additionalSkills && !communication &&!comprehension && !projectManagement && !problemSolving && !quantitativeAbility && skills.every(val=>val.name ==="" ) === true && skills.every(val=>val.value ==="" ) === true && !skills[0].required && projects.every(val=>val.name ==="" ) === true && projects.every(val=>val.desc ==="" ) === true && projects.every(val=>val.skills ==="" ) === true && !projects[0].required){
        setError(false)
        updateProfile();
      }else {
       
        goToTop()
        setError(true)
      }
  };

  
  return (
    <>
      <Navbar />
      <div className="container edit-profile">
        <header>
          <div className="title">
            <h1>{profile?.name}</h1>
            <span>
              <FiChevronRight />
            </span>
            <p>Edit Profile</p>
          </div>
          <Link to={`/dev/profile/${id}`} className="back-btn">
            Back
            <FiArrowRight />
          </Link>
        </header>
        {error && <div className="form-error"><p>Please fill in all required fields!</p></div>}
        <form onSubmit={handleSubmit} noValidate >
          <section className="edit-form">
            {/* left section */}
            <div className="left-section">
              <div className="category">
                <h3>GENERAL</h3>
                <hr />
                <div className="input-field">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    autoComplete="off"
                    id="name"
                    value={formDetails.name}
                    onChange={onInputChange}
                  />
                  <p className="error">{formErrors?.name}</p>
                </div>
                <div className="input-field ">
                  <label htmlFor="profile-pic">Profile Pic</label>
                  <div className="image-upload">
                    <>
                      <input
                        id="profile-pic"
                        type="file"
                        onChange={onImageChange}
                        accept="image/*"
                      />
                      
                      {img ? <img src={img} alt="img" />:<img src={`/uploads/${formDetails.image}`} alt="img" />}
                    </>
                  </div>
                </div>
                <div className="input-field">
                  <label htmlFor="designation">Designation</label>
                  <input
                    type="text"
                    placeholder="Role"
                    name="role"
                    autoComplete="off"
                    value={formDetails.role}
                    id="designation"
                    onChange={onInputChange}
                  />
                  <p className="error">{formErrors?.role}</p>
                </div>
                <div className="input-field">
                  <label htmlFor="about-me">About me</label>
                  <textarea
                    type="text"
                    name="description"
                    placeholder="Description"
                    autoComplete="off"
                    value={formDetails.description}
                    onChange={onInputChange}
                    id="about-me-video-desc"
                  ></textarea>
                </div>
              </div>

              {/* Dynamic Projects */}
              <div>
                {formDetails.projects.length > 0 &&
                  formDetails.projects.map((project, index) => (
                    <ProjectComp
                      key={index}
                      project={project}
                      index={index}
                      deleteProject={deleteProject}
                      onProjectsChange={onProjectsChange}
                      errors={formErrors.projects[index]}
                    />
                  ))}
                <div className="add-btn-block">
                  <button
                    type="button"
                    className="add-btn"
                    onClick={addProject}
                  >
                    Add Project
                  </button>
                </div>
              </div>
            </div>
            {/* right section */}
            <div className="right-section">
              <div className="category">
                <h3>Availability</h3>
                <hr />
                <div className="input-field ">
                  <label htmlFor="availability">
                    {" "}
                    Availability (Part Time/Full Time/Hourly)
                  </label>
                  <select
                    className="availabilitydropdown"
                    name="availability"
                    defaultValue={formDetails.availability !=="" ?formDetails.availability:"DEFAULT"}
                    onChange={onInputChange}
                    id="availability"
                  >
                   <option value="DEFAULT" disabled>
                    Select Availability
                   </option>
                   <option value={"Part Time"}>Part Time</option>
                   <option value="Full Time">Full Time</option>
                   <option value="Hourly">Hourly</option>
                  </select>
                  <p className="error">{formErrors?.availability}</p>
                </div>
                <div className="input-field">
                  <label htmlFor="availability-data">Available From Date</label>
                  <input
                    type="date"
                    placeholder="Qualified to join from MM/DD/YY"
                    name="availabilityDate"
                    value={formDetails.availabilityDate}
                    onChange={onInputChange}
                    id="availability-date"
                    min={minDate}
                  />
                  <p className="error">{formErrors?.availabilityDate}</p>
                </div>
              </div>
              <div className="category">
                <div className="input-field">
                  <h3>Proficiency</h3>
                  <hr />
                  <label htmlFor="proficiency">
                    Proficiency (Numbers Only)
                  </label>
                  <input
                    id="proficiency"
                    onChange={onInputChange}
                    value={formDetails.proficiency}
                    type="number"
                    placeholder="Proficiency"
                    name="proficiency"
                    autoComplete="off"
                    min="1"
                    max="100"
                  />
                  <p className="error">{formErrors?.proficiency}</p>
                </div>
                <div className="input-field">
                  <label htmlFor="total-exp">Total Experience</label>
                  <input
                    onChange={onInputChange}
                    id="total-exp"
                    value={formDetails.totalExp}
                    className="text-field w-input get-txp"
                    type="number"
                    placeholder="Years"
                    name="totalExp"
                    autoComplete="off"
                    min="1"
                    max="30"
                  />
                  <p className="error">{formErrors?.totalExp}</p>
                </div>
              </div>
              <div className="category skills">
                <div className="input-field-row">
                  <h3>Skills</h3>
                  <h3>Experience</h3>
                </div>
                <hr />
                <div className="general-error">
                  <p className="error">{formErrors.skills[0]?.required}</p>
                </div>
                {/* Dynamic Skills */}
                {formDetails.skills.length > 0 &&
                  formDetails.skills.map((skill, index) => (
                    <div key={index}>
                      <SkillComp
                        skill={skill}
                        index={index}
                        deleteSkill={deleteSkill}
                        onSkillsChange={onSkillsChange}
                        errors={formErrors.skills[index]}
                      />
                      <div className="value-error" >
                        <p className="error">
                          {formErrors?.skills[index]?.value}
                        </p>
                      </div>
                    </div>
                  ))}

                <div className="add-btn-block">
                  <button type="button" className="add-btn" onClick={addSkill}>
                    Add Skill
                  </button>
                </div>
              </div>
              <div className="input-field  add-skills-field">
                <label htmlFor="additional-skills">
                <h3> Additional Skills <span>(Comma seperated)</span></h3>
                </label>
                <input
                  value={formDetails.additionalSkills}
                  name="additionalSkills"
                  id="additional-skills"
                  onChange={onAdditionalSkillsChange}
                  type="text"
                  placeholder="skill 1, skill 2, skill 3...."
                />
                <p className="error">{formErrors?.additionalSkills}</p>
              </div>
              <div className="category capabilities">
                <div className="input-field-row">
                  <h3>Capabilities</h3>
                  <h3>Expertise</h3>
                </div>
                <hr />
                <CapabilitiesComp
                  label="Communication"
                  capabilityName="communication"
                  capabilityValue={formDetails.capabilities.communication}
                  onCapabilitesChange={onCapabilitesChange}
                  error={formErrors?.capabilities.communication}
                />
                <CapabilitiesComp
                  label="Comprehension"
                  capabilityName="comprehension"
                  capabilityValue={formDetails.capabilities.comprehension}
                  onCapabilitesChange={onCapabilitesChange}
                  error={formErrors?.capabilities.comprehension}
                />
                <CapabilitiesComp
                  label="Project Management"
                  capabilityName="projectManagement"
                  capabilityValue={formDetails.capabilities.projectManagement}
                  onCapabilitesChange={onCapabilitesChange}
                  error={formErrors?.capabilities.projectManagement}
                />
                <CapabilitiesComp
                  label="Problem Solving"
                  capabilityName="problemSolving"
                  capabilityValue={formDetails.capabilities.problemSolving}
                  onCapabilitesChange={onCapabilitesChange}
                  error={formErrors?.capabilities.problemSolving}
                />
                <CapabilitiesComp
                  label="Quantitative Ability"
                  capabilityName="quantitativeAbility"
                  capabilityValue={formDetails.capabilities.quantitativeAbility}
                  onCapabilitesChange={onCapabilitesChange}
                  error={formErrors?.capabilities.quantitativeAbility}
                />
              </div>
              <VideoComp
                name="Video 1 (About me)"
                video={formDetails.aboutmeVideo}
                onVideoChangeHandler={onAboutmevideoChange}
              />
              <VideoComp
                name="Video 2 (My Skillset)"
                video={formDetails.mySkillsetVideo}
                onVideoChangeHandler={onMyskillsetVideoChange}
              />
              <VideoComp
                name="Video 3 (My GMVs)"
                video={formDetails.myGmvsVideo}
                onVideoChangeHandler={onMyGmvsVideoChange}
              />

              <div className="btns-wrapper">
                <button type="submit">Update Profile</button>
                <Link to={`/dev/profile/${profile?.id}`}>
                  <button className="cancel-btn">Cancel</button>
                </Link>
              </div>
            </div>
          </section>
        </form>
      </div>
    </>
  );
};

export default EditDevProfile;
