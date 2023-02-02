const express = require("express");
const { loginUser, signupUser,resetPassword,newPassword,userLogged } = require("../controllers/authController");

const router = express.Router();




//signup user
router.post("/signup",signupUser)

//login user
router.post("/login",loginUser)

//user Data
router.post("/user-data",userLogged)

//reset password
router.patch("/reset-password",resetPassword)

//reset password
router.patch("/new-password",newPassword)

module.exports = router;
