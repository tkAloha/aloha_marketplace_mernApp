
const mongoose = require("mongoose");
const User = require("../models/userModel");
const Profile = require("../models/profileModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
var jwt = require("jsonwebtoken");

//get all users
const getAllUsers = async (req, res) => {
  
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    if(!users) {
      res.status(400).json({message:"No users found"});
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error.message);
  }
};


//add user
const addUser = async (req, res) => {
  const { name, email, password, conPassword, userType } = req.body;

  // check if name,email and password is not empty
  if (!name || !email || !password || !userType) {
    return res.status(400).json({ message: "All fields are required !" });
  }

  //validate email
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Email is not valid !" });
  }

  //check password to be atleast 5 characters long
  if (!validator.isLength(password, { min: 5, max: undefined })) {
    return res
      .status(400)
      .json({ message: "Password should be atleast 5 characters long!" });
  }

  //check to see if password match
  if (password !== conPassword) {
    return res.status(400).json({ message: "Password do not match!" });
  }
  //check if email is unique
  const result = await User.findOne({ email: email });
  if (result) {
    return res.status(400).json({ message: "Email already exist !" });
  }

  // hashing password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    //saving to users collections
    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      userType: userType,
    });
    //saving to profiles if userType is developer
    if (user.userType === "Developer") {
      const profile = await Profile.create({_id:user._id, ...req.body });
      res.status(200).json({ user:user,profile:profile });
    }else {
      res.status(200).json({ user:user });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//delete user
const deleteUser = async (req, res) => {

  const { id } = req.params;
  //check if Id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user found" });
  }
  try {
    //delete from user collection of database
    const user = await User.findOneAndDelete({ _id:id});
    res.status(200).json(user);
    
    //  if userType is developer, than deleting from profiles collection of database
     if (user.userType === "Developer") {
      const profile = await Profile.findOneAndDelete({ _id:id});
      // res.status(200).json(profile);
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//update user
const updateUser = async (req, res) => {
  const { name, email, userType} = req.body;

  // check if name,email and password is not empty
  if (!name || !email  || !userType ) {
    return res.status(400).json({ message: "All fields are required !" });
  }

  //validate email
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Email is not valid !" });
  }

   
    const { id } = req.params;
    // check if Id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such user found" });
    }

  try {
    //update the user in user collection of database
    const user = await User.findOneAndUpdate({ _id:id },
        {...req.body});

    
    //  if userType is developer, than update in profiles collection of database
    if (userType === "Developer" && user.userType === "Developer") {
      const profile = await Profile.findOneAndUpdate({ _id:id} ,{...req.body})
      res.status(200).json(profile);
    }
    else if(userType === "Developer" && user.userType === "Admin") {
      const profile = await Profile.create({_id:user._id, ...req.body });
      res.status(200).json({ user:user,profile:profile });
    }
    else if(userType === "Admin" && user.userType === "Developer") {
      const profile=await Profile.findOneAndDelete({ _id:id})
      res.status(200).json({ user:user,profile:profile });
    }else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  getAllUsers,
  addUser,
  deleteUser,
  updateUser,
};
