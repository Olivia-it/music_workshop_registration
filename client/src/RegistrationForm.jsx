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
  const [age, setAge] = useState("");
  const [parish, setParish] = useState("");
  const [level, setLevel] = useState("");
  const [voice, setVoice] = useState("");
  const [instrument, setInstrument] = useState("");
  const [meal, setMeal] = useState("");
  const [allergy, setAllergy] = useState("");
  const [terms, setTerms] = useState("");
  const [privacy, setPrivacy] = useState("");

  
  //change state after submitting form
  const [submitted, setSubmitted] = useState(null)
  const[error, setError] = useState("");


  //handle submit
  async function handleSubmit(event){
    console.log("Nothing is happening")
    event.preventDefault();

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

if(age === ""){
  setError("Please enter your age");
  return;
}

if(parish === ""){
  console.log("First time validation");
  setError("Please add your parish");
  return;
}

if(level === ""){
  console.log("Level validation");
  setError("Please select your singing level");
  return;
}

if(voice === ""){
  console.log("Voice validation");
  setError("Please select your voice type");
  return;
}

if(meal === ""){
  console.log("Meal validation");
  setError("Please select your meal preference");
  return;
}

if(allergy === ""){
  setError("Please enter your allergies or say no");
  return;
}

if(terms === ""){
  console.log("Terms validation");
  setError("Please agree to the terms and conditions");
  return;
}

if(terms === "no"){
  console.log("Terms validation");
  setError("You must agree to the terms and conditions to register");
  return;
}

if(privacy === ""){
  console.log("Privacy validation");
  setError("Please select if you consent to being recorded");
  return;
}

console.log("Passed all validation");

    //store submitted data in React state
    const registrationData = {
      name: name,
      email: email,
      phone: phone,
      age: age,
      parish: parish,
      level: level,
      voice: voice,
      instrument: instrument,
      meal: meal,
      allergy: allergy,
      terms: terms,
      privacy: privacy,
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
   setAge("");
   setParish("");
   setLevel("");
   setVoice("");
   setInstrument("");
   setMeal("");
   setAllergy("");
   setTerms("");
   setPrivacy("");
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
 
      <h1>Music Workshop Registration Form</h1>
      <h2>Warsztaty Muzyki Liturgicznej z Hubertem</h2>
      
    {!submitted ?(
      <form onSubmit={handleSubmit}>
  
       {error && <p className="error-msg">{error}</p>}

  <section className="personal-info question">

        <div className="name field">
          <label className="lbl">Imie i Nazwisko</label><br />
          <input className="personal-input" type="text" placeholder="John Smith" value={name} onChange={(e)=>setName(e.target.value)} />
        </div>

        <div className="email field">
          <label className="lbl">Email</label><br />
          <input className="personal-input" type="email" placeholder="john@example.com" value={email} onChange={(e)=> setEmail(e.target.value)}/>
        </div>

        <div className="phone field">
          <label className="lbl">Telefon</label><br />
          <input className="personal-input" type="tel" placeholder="079..." value={phone} onChange={(e)=> setPhone(e.target.value)}/>
        </div>
        </section>

        <section className="additional-info">

        <div className="question">  
          <label className="lbl">Ile masz lat?</label><br />
          <input type="radio" name="age" value="teen" checked={age === "teen"} onChange={(e) => setAge(e.target.value)}/> Ponizezej 16 lat <br />
          <input type="radio" name="age" value="adult" checked={age === "adult"} onChange={(e) => setAge(e.target.value)}/> 16+ <br />
        </div>

        <div className="question">
          <label className="lbl">Do jakiej parafi nalezysz?</label><br />
         <input type="text" placeholder="St Ignatius Church" value={parish} onChange={(e) => setParish(e.target.value)} />
        </div>

        <div className="question">
          <label className="lbl">Poziom doświadczenia w śpiewie?</label><br />
          <input type="radio" name="level" value="beginner" checked={level === "beginner"} onChange={(e) => setLevel(e.target.value)} /> Początkujący <br />
          <input type="radio" name="level" value="intermediate" checked={level === "intermediate"} onChange={(e) => setLevel(e.target.value)} /> Średniozaawansowany <br />
          <input type="radio" name="level" value="advanced" checked={level === "advanced"} onChange={(e) => setLevel(e.target.value)} /> Zaawansowany <br />
        </div>

      <div className="question">
      <label className="lbl">Jakim glosem śpiewasz?</label><br />
      <input type="radio" name="voice" value="soprano" checked={voice === "soprano"} onChange={(e) => setVoice(e.target.value)} /> Sopran <br />
      <input type="radio" name="voice" value="alto" checked={voice === "alto"} onChange={(e) => setVoice(e.target.value)} /> Alt <br />
      <input type="radio" name="voice" value="tenor" checked={voice === "tenor"} onChange={(e) => setVoice(e.target.value)} /> Tenor <br />
      <input type="radio" name="voice" value="bass" checked={voice === "bass"} onChange={(e) => setVoice(e.target.value)} /> Bass <br />
      <input type="radio" name="voice" value="not-sure" checked={voice === "not-sure"} onChange={(e) => setVoice(e.target.value)} /> Nie wiem <br />
        </div>

        <div className="question">
          <label className="lbl">Czy grałeś na jakimś instrumencie?</label><br />
          <input type="text" placeholder="gitara" value={instrument} onChange={(e) => setInstrument(e.target.value)} />
        </div>

        <div className="question">
          <label className="lbl">Preferencje dotyczące posiłków</label><br />
          <input type="radio" name="meal" value="meat" checked={meal === "meat"} onChange={(e) => setMeal(e.target.value)} /> Mięsny <br />
          <input type="radio" name="meal" value="vegetarian" checked={meal === "vegetarian"} onChange={(e) => setMeal(e.target.value)} /> Wegetariański <br />
        </div>

        <div className="question">
          <label className="lbl">Alergie zywieniowe</label>
          <input type="text" name="allergy" placeholder="nie" value={allergy} onChange={(e) => setAllergy(e.target.value)}  />
        </div>

        <div className="question">
          <label className="lbl">Czy akceptujesz regulamin?</label><br />
          
          <input type="radio" name="terms" value="yes" checked={terms === "yes"} onChange={(e) => setTerms(e.target.value)} /> Tak
          <input type="radio" name="terms" value="no" checked={terms === "no"} onChange={(e) => setTerms(e.target.value)} /> Nie <br />
          <div className="btn-div"></div>
          <a className="additional-btn"href="#terms-and-conditions">Zobacz regulamin</a> 
          </div>
          
        
       
        <div className="question">
          <label className="lbl">Czy zgadzasz sie na filmowanie?</label><br />
          
          <input type="radio" name="privacy" value="yes" checked={privacy === "yes"} onChange={(e) => setPrivacy(e.target.value)} /> Tak
          <input type="radio" name="privacy" value="no" checked={privacy === "no"} onChange={(e) => setPrivacy(e.target.value)} /> Nie <br />
          <div className="btn-div"></div>
          <a className="additional-btn" href="#filming-consent">Filming Consent</a>  
          </div>
          
      

        </section>
        {error && <p className="error-msg">{error}</p>}
        <button type="submit">Register</button>
      </form>

  
    ) :
(
  // Subition confirmation message and button to register another person
        <div className="submitted-box">
          <p className="reg-confirmation-message">Welcome {submitted.name}! Your Registration has been received! 
            You will soon reveive an email with payment instructions.</p>
          <button className="newBtn" onClick={handleNewRegistration}>Register Another Person</button>
          
          </div>
      )
      }

      <div className="division"></div>

      <div className="question">
      <p className="title" id="terms-and-conditions">Terms and Conditions</p>
      <p className="plain-text">
3. Uczestnicy warsztatów, chórzyści i instrumentaliści, wezmą udział w zajęciach z emisją głosu, kształcenia słuchu muzycznego, dykcji, nauki pieśni liturgicznych i uwielbieniowych, chorału gregoriańskiego, doskonalenia gry na instrumentach oraz konferencjach na temat muzyki liturgicznej i w kręgu liturgicznym.

4. Sobotnie ćwiczenia warsztatowe są organizowane w sali głównej Stacja Dom Polski 
5. Zwieńczeniem warsztatów będzie Msza św. w niedzielę 23.03.2025 o godz.11.30 w kościele Sacred Heart of Jesus & St Cuthbert Church
</p>
    </div>
    <div className="question">
      <p className="title" id="filming-consent">Filming Consent</p>
      <p className="plain-text">I give my permission to use my photograph and video. I understand that the images may be used in print publications, online publications, presentations, websites, and social media. I also understand that no royalty, fee or other compensation shall become payable to me by reason of such use.</p>
    </div>

    </div>
    
  );
}

export default App;