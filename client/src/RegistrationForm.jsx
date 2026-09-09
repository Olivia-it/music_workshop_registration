import "./App.css"
// react to rember the values typed in
import { useState } from "react"
import Registrations from "./Registrations";


function App() {

// name = current value, setName = change value
  //crate a state called name, start with "" and let function setName update it
  //destructuring arr or results
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  //change state after submitting form
  const [submitted, setSubmitted] = useState(null)
  const[error, setError] = useState("");


  //handle submit
  async function handleSubmit(event){
    console.log("Nothing is happening")
    event.preventDefault();
    //clear previous errors
    setError("");
    


//data validation in handleSubmit function 
if(name.trim() === ""){
  setError("Please enter your name")
  return;
}
if(email.trim()=== ""){
  setError("Please enter your email");
  return;
}
if(!email.includes("@")){
  setError("Please enter valid email address")
  return;
}
if(phone.trim() === ""){
  setError("Please enter your phone number");
  return;
}
if(phone.length < 11){
  setError("Please enter a valid phone number");
  return;
}

    //store submitted data in React state
    const registrationData = {
      name: name,
      email: email,
      phone: phone
    };

    try {
      const response = await fetch("https://music-workshop-registration.onrender.com/register", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(registrationData)
      });

      const result = await response.json();

      if (result.success){
        setError("");
        setSubmitted(registrationData);
      }
    }

    catch(error){
      console.error("Error submitting registration, OG: ", error)
    }
  }
  
  //fuction when user clicks on register another person button
  //it resets the fields to empty and displays form again
  function handleNewRegistration(){
   setName("");
   setEmail("");
   setPhone("");
   setSubmitted("")
}

  return (
    <div className="container">
      <h1>Music Workshop Registration Form</h1>
      
    {!submitted ?(
      <form onSubmit={handleSubmit}>
       <p>Please enter your details to register</p> 
       {error && <p className="error-msg">{error}</p>}
        <div className="name field">
          <label className="lbl">Full Name</label><br />
          <input type="text" placeholder="John Smith" value={name} onChange={(e)=>setName(e.target.value)} />
        </div>

        <div className="email field">
          <label className="lbl">Email</label><br />
          <input type="email" placeholder="john@example.com" value={email} onChange={(e)=> setEmail(e.target.value)}/>
        </div>

        <div className="phone field">
          <label className="lbl">Phone Number</label><br />
          <input type="tel" placeholder="079..." value={phone} onChange={(e)=> setPhone(e.target.value)}/>
        </div>

        <button type="submit">Register</button>
      </form>
    ) :
(
        <div className="submitted-box">
          <p>Your Registration has been received!</p>
          <p>Name: {submitted.name}</p>
          <p>Email: {submitted.email}</p>
          <p>Phone: {submitted.phone}</p>
          <button class="newBtn" onClick={handleNewRegistration}>Register Another Person</button>
          
          </div>
      )
      }
    </div>
  );
}

export default App;