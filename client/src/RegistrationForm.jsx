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

    //debugging: log the form data to the console
     console.log("Passed preventDefault"); 

    //clear previous errors
    setError("");

    console.log("Passed setError");
    


//data validation in handleSubmit function 
if(name.trim() === ""){
   console.log("Name validation");
  setError("Please enter your name")
  return;
}
if(email.trim()=== ""){
  console.log("Email validation");
  setError("Please enter your email");
  return;
}
if(!email.includes("@")){
  console.log("Invalid email validation");
  setError("Please enter valid email address")
  return;
}
if(phone.trim() === ""){
  console.log("Phone validation");
  setError("Please enter your phone number");
  return;
}
if(phone.length < 11){
  console.log("Invalid phone validation");
  setError("Please enter a valid phone number");
  return;
}

console.log("Passed all validation");

    //store submitted data in React state
    const registrationData = {
      name: name,
      email: email,
      phone: phone
    };

//use BE url- react fetch through express from db
    
    try {
      const response = await fetch("https://music-workshop-registration.onrender.com/register",
      //const response = await fetch("http://localhost:5000/register",
         {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(registrationData)
      });

      const result = await response.json();

      //debugging: log the backend response to the console
      console.log("Backend response:", result);

      if (result.success){
        setError("");
        setSubmitted(registrationData);
      }
      else{
        setError(result.message || "Failed to submit registration");
      }
    }

    catch(error){
      console.error("Error submitting registration, OG: ", error);
      setError("Unable to connect to the server");
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
      <header className="header">
      <img src="https://www.stignatius.pl/wp-content/uploads/st-ignatius-polskie-duszpasterstwo-logo-w200.jpg"
        alt="St Ignatius Church Logo"
        className="logo"/>
        <div className="contact-info">
      <p className="contact-text">St Ignatius Church</ p>
      <p className="contact-text">27 High Road, Stamford Hill</ p>
      <p className="contact-text">London N15 6ND</ p>
      <p className="contact-text">Contact: warsztaty.stamfordhill@gmail.com</p>
      </div>
      </header>
      <nav>
        <a href="#payment-information">Make a Payment</a>
        <a href="#terms-and-conditions">Terms and Conditions</a>
        <a href="#filming-consent">Filming Consent</a>
      </nav>
      <h1>Music Workshop Registration Form</h1>
      
    {!submitted ?(
      <form onSubmit={handleSubmit}>
       <p>Please enter your details to register</p> 
       {error && <p className="error-msg">{error}</p>}

  <section className="personal-info question">

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
        </section>

        <section className="additional-info">

        <div className="question">
          <label className="lbl">Is this your first time attending a music workshop?</label><br />
          <input type="radio" name="firstTime" value="yes" /> Yes <br />
          <input type="radio" name="firstTime" value="no" /> No
        </div>

        <div className="question">
          <label className="lbl">What is your singing level?</label><br />
          <input type="radio" name="level" value="beginner" /> Never Sang Before <br />
          <input type="radio" name="level" value="intermediate" /> Intermediate <br />
          <input type="radio" name="level" value="advanced" /> Advanced <br />
        </div>

      <div className="question">
      <label className="lbl">What is the type of your voice?</label><br />
      <input type="radio" name="voice" value="soprano" /> Soprano <br />
      <input type="radio" name="voice" value="alto" /> Alto <br />
      <input type="radio" name="voice" value="tenor" /> Tenor <br />
      <input type="radio" name="voice" value="bass" /> Bass <br />
      <input type="radio" name="voice" value="not-sure" /> I don't know <br />
        </div>

        <div className="question">
          <label className="lbl">Do you play any instruments?</label><br />
          <input type="text" placeholder="guitar"/>
        </div>

        <div className="question">
          <label className="lbl">Your meal preferences</label><br />
          <input type="radio" name="meal" value="vegetarian" /> Vegetarian <br />
          <input type="radio" name="meal" value="meat" /> Meat <br />
        </div>

        <div className="question">
          <label className="lbl">Do you agree to the terms and conditions?</label><br />
          <input type="radio" name="terms" value="yes" /> Yes
          <input type="radio" name="terms" value="no" /> No
        </div>
       
        <div className="question">
          <label className="lbl">Do you consent to being recorded?</label><br />
          <input type="radio" name="privacy" value="yes" /> Yes
          <input type="radio" name="privacy" value="no" /> No
        </div>

        </section>
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

      <div className="payment-info-additional">
        <p>You will receive a confirmation email within 24h of making the payment.</p>
        <a href="#payment-information">Make a payment</a>
      </div>

      <div className="division"></div>

      <div className="question">
      <p className="title" id="terms-and-conditions">Terms and Conditions</p>
      <p className="plain-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque nobis, veritatis nisi nihil deserunt, incidunt praesentium deleniti maxime alias libero cupiditate dolorum ipsam magnam laborum omnis ab. Iusto, distinctio sapiente.</p>
    </div>
    <div className="question">
      <p className="title" id="filming-consent">Filming Consent</p>
      <p className="plain-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque nobis, veritatis nisi nihil deserunt, incidunt praesentium deleniti maxime alias libero cupiditate dolorum ipsam magnam laborum omnis ab. Iusto, distinctio sapiente.</p>
    </div>
    <div className="question">
      <p className="title" id="payment-information">Payment Information</p>
      <p className="plain-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque nobis, veritatis nisi nihil deserunt, incidunt praesentium deleniti maxime alias libero cupiditate dolorum ipsam magnam laborum omnis ab. Iusto, distinctio sapiente.</p>
    </div>
    
    
    </div>
  );
}

export default App;