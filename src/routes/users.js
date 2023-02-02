const express = require("express");
const {
  getAllUsers,
  addUser,
  deleteUser,
  updateUser
} = require("../controllers/userController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

//require auth for all user routes;
router.use(requireAuth);

//get all users
router.get("/", getAllUsers);

//add new profile
router.post("/", addUser);

//delete a profile
router.delete("/:id", deleteUser);

//update a profile
router.patch("/:id", updateUser);

module.exports = router;
