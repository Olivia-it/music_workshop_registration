require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

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
// const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   family: 4,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });



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
  age: {
    type: String,
    required: true,
  },
  parish: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  voice: {
    type: String,
    required: true,
  },
  instrument: {
    type: String,
    required: false,
  },
  meal: {
    type: String,
    required: true,
  },
  allergy: {
    type: String,
    required: true,
  },
  terms: {
    type: String,
    required: true,
  },
  privacy: {
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

  const { name, email, phone, age, parish, level, voice, instrument, meal, allergy, terms, privacy } = req.body;

  try {
//validate if existing email
const existing = await Registration.findOne({ email });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "A registration with this email already exists"
      });
    }

    //save to mongo
    const newRegistration = new Registration({
      name,
      email,
      phone,
      age,
      parish,
      level,
      voice,
      instrument,
      meal,
      allergy,
      terms,
      privacy,
    });
    await newRegistration.save();
    console.log("Registration saved to mongo")

    console.log("About to send email");

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.EMAIL_TO,
      subject: "New Workshop Registration",
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Age: ${age}
        Parish: ${parish}
        Level: ${level}
        Voice: ${voice}
        Instrument: ${instrument}
        Meal: ${meal}
        Allergy: ${allergy}
        Privacy: ${terms}
        Filming Consent: ${privacy}
      `
    });

    if (error) {
  console.error("Resend error:", error);
    return res.status(500).json({
    success: false,
    message: "Failed to send registration email"
  });
}

    console.log("Email sent successfully", data.id);

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

  //protect access to /registration from just typing the endpoint
  //make sure to store the token in React app.jsx
  const token = req.headers.authorization;

  if(token !== process.env.ADMIN_TOKEN){
    return res.status(403).json({
      error: "Access denied"
    })
  }
    //mongo to find registration document, Registration is a mongoose model
  const registrations = await Registration.find();
  res.json(registrations);

} catch(error){
  console.log("Error getting registrations:", error);
  res.status(500).json({error: "Could not get registrations"});
}
});


// login endpoint
app.post("/admin/login", (req, res) => {
  const {email, password} = req.body;

  if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
    res.json({success: true,
      token: process.env.ADMIN_TOKEN,
    });
    }
    else{
      res.status(401).json({success: false, message: "Invalid login details"});
    }
});

//debugging: check if smtp.gmail.com resolves to an IP address
const dns = require("dns");

dns.lookup("smtp.gmail.com", { family: 4 }, (err, address) => {
  if (err) {
    console.log("IPv4 lookup error:", err);
  } else {
    console.log("Gmail IPv4 address:", address);
  }
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`My server running on port ${PORT}`);
});