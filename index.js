require("dotenv").config();

const express = require("express");
const cors =require("cors");
const mongoose = require("mongoose");
const profilesRoutes = require("./src/routes/profiles");
const authRoutes = require("./src/routes/auth");
const userRoutes = require("./src/routes/users");


const PORT = process.env.PORT;

//express app
// const app = express();
const app = (module.exports = express())
app.use(cors());
app.options('*', cors());

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));

//routes
app.use("/profiles", profilesRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);


//connecting to DB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connection to database successful");
    //listen for requests
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
