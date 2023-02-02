const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const profileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default:"default_profile.png"
    },
    description: {
      type: String,
      default: "",
    },
    totalExp: {
      type: Number,
      default: 0,
    },
    proficiency: {
      type: Number,
      default: 0,
    },
    availability: {
      type: String,
      default: "",
    },
    availabilityDate: {
      type: String,
      default: "",
    },
    skills:{
      type:Array,
      default:{
        name:"",
        value:0,
      },
    },
    additionalSkills: {
      type: [String],
    },
    projects:{
      type:Array,
      default :{
        name:"",
        desc:"",
        skills:[],
      }
    },
    capabilities: {
      communication: {
        type: Number,
        default: 0,
      },
      comprehension: {
        type: Number,
        default: 0,
      },
      projectManagement: {
        type: Number,
        default: 0,
      },
      problemSolving: {
        type: Number,
        default: 0,
      },
      quantitativeAbility: {
        type: Number,
        default: 0,
      },
    },
    aboutmeVideo: {
      title: {
        type: String,
        default: "",
      },
      desc: {
        type: String,
        default: "",
      },
      link: {
        type: String,
        default: "",
      },
    },
    mySkillsetVideo: {
      title: {
        type: String,
        default: "",
      },
      desc: {
        type: String,
        default: "",
      },
      link: {
        type: String,
        default: "",
      },
    },
    myGmvsVideo: {
      title: {
        type: String,
        default: "",
      },
      desc: {
        type: String,
        default: "",
      },
      link: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
