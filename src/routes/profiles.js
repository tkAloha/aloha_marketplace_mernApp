const express = require("express");
const multer =require("multer");
const path=require("path");
const {
  getAllProfiles,
  getSingleProfile,
  addProfile,
  deleteProfile,
  updateProfile,
} = require("../controllers/profileController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// Configurations for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,path.join(process.cwd(), './uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })


//require auth for all profile routes;
router.use(requireAuth);

//get all profiles
router.get("/", getAllProfiles);

//get single profile
router.get("/:id", getSingleProfile);

//add new profile
router.post("/", addProfile);

//delete a profile
router.delete("/:id", deleteProfile);

//update a profile
router.patch("/:id",upload.single('image'), updateProfile);

module.exports = router;
