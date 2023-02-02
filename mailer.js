const Mailer = require("nodemailer");
require("dotenv").config();


// Initialize the Authentication of Gmail Options
const transporter = Mailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

module.exports = { transporter };
