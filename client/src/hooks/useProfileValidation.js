import {  useState } from "react";
import { useProfileContext } from "../context/ProfileContext";

const useProfileValidation = () => {

  const { profile } = useProfileContext();


  const [formErrors, setFormErrors] = useState({
    name: "",
    role: "",
    totalExp: "",
    proficiency: "",
    availability: "",
    availabilityDate: "",
    skills: [{
      name:"",
      value:"",
      required:""
    }],
    additionalSkills: "",
    projects:[
      {
        name: "",
        desc: "",
        skills: "",
        required: "",
      },
    ],
    capabilities: {
      communication: "",
      comprehension: "",
      projectManagement: "",
      problemSolving: "",
      quantitativeAbility: "",
    },
  });

  //name validation
  const nameValidation = (value) => {
    if (value === "") {
      formErrors.name ="Name is required"
    } else {
      formErrors.name =""
    }
  };

  //role validation
  const roleValidation = (value) => {
    if (value === "") {
      formErrors.role ="Role is required"
    } else {
      formErrors.role =""
    }
  };

  //availability validation
  const availabilityValidation = (value) => {
    if (value === "") {
      formErrors.availability ="Select your availability"
    } else {
      formErrors.availability =""
    }
  };

  //availability date validation
  const availabilityDateValidation = (value) => {
    if (value === "") {
      formErrors.availabilityDate ="Select your availability date"
    } else {
      formErrors.availabilityDate =""
    }
  };

  //proficiency validation
  const proficiencyValidation = (value) => {
    if (value < 1 || isNaN(value)) {
      formErrors.proficiency ="Proficiency is required"
    } else if (value > 100) {
      
      formErrors.proficiency ="Value must be less than or equal to 100"
    } else {
      setFormErrors((prevState) => ({
        ...prevState,
        proficiency: "",
      }));
      formErrors.proficiency = ""
    }
  };

  //Total experience validation
  const totalExpValidation = (value) => {
    if (value < 1 || isNaN(value)) {
      formErrors.totalExp ="Total Experience is required"
    } else if (value > 30) {
      formErrors.totalExp ="Value must be between 1 to 30"
    } else {
      formErrors.totalExp =""
    }
  };

  //skills validation
  const skillsValidation = (value, totalExp) => {
  
    value.forEach((skill, index) => {
      //add validation at least one skill is required
  
      if (index === 0 && (skill.name === "" || skill.value < 1)) {
        
        formErrors.skills[0].required = "There should be at least one skill";
      } else {
        formErrors.skills[0].required = "";
      }
      // check if name and value both are not empty
      if (skill.name === "" || skill.value < 1 || isNaN(skill.value)) {
        formErrors.skills[index].name = "Both the fields are required";
      
      } else {
        formErrors.skills[index].name = "";
      }
      if (skill.value > totalExp) {
        formErrors.skills[index].value =
          "Skillset-Experience should not be greater than Total Experience";
      } else {
        formErrors.skills[index].value = "";
       
      }
    });

  };

  // additional skills validation
  const additionalSkillsValidation = (value) => {
    if (value.length === 0) {
      formErrors.additionalSkills ="Additional skills is required"
    } else {
      formErrors.additionalSkills =""
    }
  };

  //project validation
  const projectsValidation = (value) => {
    value.forEach((project, index) => {
      //add validation at least one project is required
      if (
        index === 0 &&
        (project.name === "" ||
          project.desc === "" ||
          project.skills.length === 0)
      ) {
        formErrors.projects[0].required =
          "There should be at least one project";
      } else {
        formErrors.projects[0].required = "";
        
      }
      //check if name is not empty
      if (project.name === "") {
        formErrors.projects[index].name = "Project name is required";
      } else {
        formErrors.projects[index].name = "";
      }
      //check id description is not empty
      if (project.desc === "" || project.desc === `<p><br></p>`) {
        formErrors.projects[index].desc = "Project description is required";
      } else {
        formErrors.projects[index].desc = "";
      }
      //check if skills is not empty
      if (project.skills?.join(",").length === 0) {
        formErrors.projects[index].skills = "Project skills are required";
      } else {
        formErrors.projects[index].skills = "";
      }
    });
  };

  //capabilities validation
  const capabilitiesValidation = (values) => {
    Object.entries(values).forEach((curArr) => {
      let property = curArr[0];
      let value = curArr[1];
      if (isNaN(value) || value === 0 || value < 3 || value > 5) {
        formErrors.capabilities[property] = "Please enter a value from 3 to 5";
      } else {
        formErrors.capabilities[property] = "";
      }
    });
  };


  return {
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
  };
};

export default useProfileValidation;
