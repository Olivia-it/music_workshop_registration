require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const nodemailer = require("nodemailer");

app.use(cors());
app.use(express.json());

//email transporter hotmail
// const transporter = nodemailer.createTransport({
//   host: "smtp.office365.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

//email transporter gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


//setting up the server:
//-npm install express cors
//create index.js, run index.js
// "/" end point is root of the server
// app is express server
app.get("/", (req, res) => {
    res.send("server is running OG");
});


//connect react form to backend

//post contains react object
//res.json sends back response to React
app.post("/register", async (req, res) => {
  console.log("Received registration:", req.body);

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: "New Workshop Registration",
      text: `
        Name: ${req.body.name}
        Email: ${req.body.email}
        Phone: ${req.body.phone}
      `
    });

    console.log("Email sent successfully");

    res.json({ success: true });

  } catch (error) {
    console.log("Email sending error: ", error);
    res.status(500).json({ success: false });
  }
});


app.listen(5000, () => {
    console.log("My server running on localhost:5000")
})
