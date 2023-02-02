const Profile = require("../models/profileModel");
const User = require("../models/UserModel");
const mongoose = require("mongoose");


//get all profiles
const getAllProfiles = async (req, res) => {
  
  try {
    const profiles = await Profile.find({}).sort({ createdAt: -1 });
    if(!profiles) {
      res.status(400).json({message:"No profiles found"});
    }
    res.status(200).json(profiles);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//get single profile
const getSingleProfile = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Profile found" });
  }
  try {
    const profile = await Profile.findById({ _id: id });
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//add profile
const addProfile = async (req, res) => {
  const { name, title } = req.body;
  if(!name || !title) {
    res.status(400).json({error:"Name and title required"});
  }
  try {
    const profile = await Profile.create({ ...req.body });
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//delete profile
const deleteProfile = async (req, res) => {

  const { id } = req.params;
  //check if Id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Profile found" });
  }
  try {
    const profile = await Profile.findOneAndDelete({ _id:id});
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//update profile
const updateProfile = async (req, res) => {
    const { id } = req.params;
    //check if Id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such Profile found" });
    }
    const capabilities=req.body.capabilities;
    const aboutmeVideo=req.body.aboutmeVideo;
    const mySkillsetVideo = req.body.mySkillsetVideo;
    const myGmvsVideo = req.body.myGmvsVideo;
    const skills =req.body.skills;
    const projects =req.body.projects;
    const image = req.file?.originalname;
    
    const dataObj={
      name:req.body.name,
      role:req.body.role,
      description:req.body.description,
      image:image,
      totalExp:req.body.totalExp,
      proficiency:req.body.proficiency,
      availability:req.body.availability,
      availabilityDate:req.body.availabilityDate,
      additionalSkills:req.body.additionalSkills,
      capabilities:JSON.parse(capabilities),
      aboutmeVideo:JSON.parse(aboutmeVideo),
      mySkillsetVideo:JSON.parse(mySkillsetVideo),
      myGmvsVideo:JSON.parse(myGmvsVideo),
      skills:JSON.parse(skills),
      projects:JSON.parse(projects)
    }
    
  try {
    const profile = await Profile.findOneAndUpdate({ _id:id },
        {...dataObj});
    //update user
    const user = await User.findOneAndUpdate({ _id:id },
      {...dataObj});
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
module.exports = {
  getAllProfiles,
  getSingleProfile,
  addProfile,
  deleteProfile,
  updateProfile,
};
