require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const { MongoServerClosedError } = require("mongodb");

app.use(cors());
app.use(express.json());


mongoose 
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongooDB Atlas"))
    .catch((err) => console.log("Mongo connection error OG", err));

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

//Creating registration model. Mongo will use it to create db
const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required : true,
  },
  phone: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date, 
    default: Date.now,
  }
})
// this creates a model called Registration
const Registration = mongoose.model("Registration", registrationSchema);

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
//res.json sends back response to React and saves registration in mongoDB
app.post("/register", async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    //save to mongo
    const newRegistration = new Registration({
      name,
      email,
      phone,
    });
    await newRegistration.save();
    console.log("Registration saved to mongo")

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: "New Workshop Registration",
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
      `
    });

    res.json({ 
      success: true,
      message: "Email sent successfully",
  });
} 


  catch (error) {
    console.error("Email sending error: ", error);
    res.status(500).json({ 
      success: false, 
    message: "Failed to submit registration" });
  }
});

//get will show existing registrations, creating a server end point
app.get("/registrations", async(req, res) => {

  try{
    //mongo to find registration document, Registration is a mongoose model
  const registrations = await Registration.find();
  res.json(registrations);

} catch(error){
  console.log("Error getting registrations:", error);
  res.status(500).json({error: "Could not get registrations"});
}
});



app.listen(5000, () => {
    console.log("My server running on localhost:5000")
})
