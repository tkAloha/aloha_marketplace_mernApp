const mongoose = require("mongoose");
const User = require("../models/userModel");
const Profile = require("../models/profileModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
var jwt = require("jsonwebtoken");
const crypto = require("crypto");

const { transporter } = require("../../mailer");
//create webtoken
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // check if email and password is not empty
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //to check if user exist
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  //match password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  try {
    // create a token
    const token = createToken(user._id);
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      userType: user.userType,
      token: token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//userDetails
const userLogged =async (req,res)=>{
const {token} = req.body;
try {
  const  result = jwt.verify(token,process.env.SECRET,(err,res)=>{
    if(err){
      return "token expired"
    }
    return res
  })
  if(result === "token expired"){
    return res.status(200).json({data:"token expired"})
  }
  //get user from the database
  const user = await User.findOne({ _id:result._id });
  if (user) {
    return res.status(200).json({ data:user });
  }
} catch (error) {
  console.log(error)
}

}
//signup user
const signupUser = async (req, res) => {
  const { name, email, password, conPassword, userType } = req.body;

  // check if name,email and password is not empty
  if (!name || !email || !password) {
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
      .json({ message: "Password should be atleast 5 characters long !" });
  }

  //check if password and conPassword match
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
    if (userType === "Developer") {
      const profile = await Profile.create({ _id: user._id, ...req.body });
    }

    //create a token
    // const token = createToken(user._id);
    res.status(200).json({ email: email });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//getUsers
const getUsers = async (req, res) => {
  //get users from database
  const users = await User.find({}).sort({ createdAt: -1 });
  try {
    if (!users) {
      res.status(200).json({ error: "No users found" });
    }
    res.status(400).json(users);
  } catch (error) {
    res.status(200).json(error.message);
  }
};

//reset password
const resetPassword = async (req, res) => {
  const email = req.body.email;
  const result = await User.findOne({ email: email });

  // check if email is not empty
  if (!email) {
    return res.status(400).json({ message: "Please enter your email!" });
  }

  //check email is valid
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Email is not valid !" });
  }
  if (!result) {
    return res.status(400).json({ message: "User doesn't exist!" });
  }
  try {
    crypto.randomBytes(32, async (err, buffer) => {
      if (err) {
        console.log(err);
      } else {
        const token = buffer.toString("hex");
        const tokenExpiry = Date.now() + 3600000;
        // let resetLink = `http://${req.headers.host}/reset/${token}`
        let hostname = process.env.HOSTNAME;

        const resetLink = `http://${hostname}:3000/reset/${token}`;

        //update the user in user collection of database
        const user = await User.findOneAndUpdate(
          { email: email },
          { resetToken: token, expireToken: tokenExpiry }
        );
        // Send an Email
        transporter.sendMail({
          from: process.env.FROM_EMAIL, // Sender ID
          to: result.email, // Receiver ID
          subject: "Password change request", // Mail Subject
          html: ` 
                                    
         <h3>Password Reset</h3>
         <p style="font-size:16px">A password reset has been initiated</p>
         <p style="margin-bottom:35px;font-size:16px">If you do not reset your password within 1 hour, you will need to request a new one.</p>
         <p style="font-size:16px ; font-weight:bold">To complete the password reset process, visit the following link:.</p>
         <a  href=${resetLink}>${resetLink}</a>
         <p style="margin-top:60px">If you did not request this, please ignore this email and your password will remain unchanged.</p>
         `,
        });
        res.status(200).json({ msg: `A reset email has been sent to` });
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//new  password
const newPassword = async (req, res) => {
  const password = req.body.password;
  const conPassword = req.body.conPassword;
  const sentToken = req.body.resetToken;

  const result = await User.findOne({
    resetToken: sentToken,
    expireToken: { $gt: Date.now() },
  });
 
  if (!result) {
    return res.status(400).json({
      message:
        "Password reset token is invalid or has expired, Please try again!",
    });
  }

  // check if password or confirm password  is  empty
  if (!password || !conPassword) {
    return res.status(400).json({ message: "All fields are required !" });
  }
  //check password to be atleast 5 characters long
  if (!validator.isLength(password, { min: 5, max: undefined })) {
    return res
      .status(400)
      .json({ message: "Password should be atleast 5 characters long !" });
  }

  //check if password and conPassword match
  if (password !== conPassword) {
    return res.status(400).json({ message: "Password do not match!" });
  }
  // hashing password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  try {
    //update the user in user collection of database
    const user = await User.findOneAndUpdate(
      { email: result.email },
      { password: hashedPassword, resetToken: "", expireToken: Date.now() }
    );
    
    // Send an Email
    transporter.sendMail({
      from: process.env.FROM_EMAIL, // Sender ID
      to: result.email, // Receiver ID
      subject: "Your password has been changed", // Mail Subject
      html: `                             
     <h3>Password Updated</h3>
     <p style="font-size:16px">This is a confirmation that the password for your account ${user.email} has just been changed</p>
     `,
    });
    res
      .status(200)
      .json({ msg: `Your password has been updated successfully` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { loginUser, signupUser, resetPassword, newPassword ,userLogged};
