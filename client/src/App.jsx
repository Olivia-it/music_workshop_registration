import "./App.css"
// react to rember the values typed in
import { useState } from "react"

function App() {

// name = current value, setName = change value
  //crate a state called name, start with "" and let function setName update it
  //destructuring arr or results
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  //change state after submitting form
  const [submitted, setSubmitted] = useState(null)


  //handle submit
  async function handleSubmit(event){
    event.preventDefault();
    //store submitted data in React state
    const registrationData = {
      name: name,
      email: email,
      phone: phone
    };

    try {
      const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(registrationData)
      });

      const result = await response.json();

      if (result.success){
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
      

{// sumitted is null at the moment
}
    {!submitted ?(
      <form onSubmit={handleSubmit}>
        <p>Please enter your details to register</p>
        <div className="name field">
          <label class="lbl">Full Name</label><br />
          <input type="text" placeholder="John Smith" value={name} onChange={(e)=>setName(e.target.value)} />
        </div>

        <div className="email field">
          <label class="lbl">Email</label><br />
          <input type="email" placeholder="john@example.com" value={email} onChange={(e)=> setEmail(e.target.value)}/>
        </div>

        <div className="phone field">
          <label class="lbl">Phone Number</label><br />
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