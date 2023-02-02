const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
  resetToken: {
    type: String,
    default: "",
  },
  expireToken: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
