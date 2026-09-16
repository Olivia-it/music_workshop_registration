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
  const [parish, setParish] = useState("");
  const [level, setLevel] = useState("");
  const [voice, setVoice] = useState("");
  const [instrument, setInstrument] = useState("");
  const [meal, setMeal] = useState("");
  const [terms, setTerms] = useState("");
  const [privacy, setPrivacy] = useState("");

  
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
      parish: parish,
      level: level,
      voice: voice,
      instrument: instrument,
      meal: meal,
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
   setParish("");
   setLevel("");
   setVoice("");
   setInstrument("");
   setMeal("");
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
          <label className="lbl">What is your parish?</label><br />
         <input type="text" placeholder="St Ignatius Church" value={parish} onChange={(e) => setParish(e.target.value)} />
        </div>

        <div className="question">
          <label className="lbl">What is your singing level?</label><br />
          <input type="radio" name="level" value="beginner" checked={level === "beginner"} onChange={(e) => setLevel(e.target.value)} /> Never Sang Before <br />
          <input type="radio" name="level" value="intermediate" checked={level === "intermediate"} onChange={(e) => setLevel(e.target.value)} /> Intermediate <br />
          <input type="radio" name="level" value="advanced" checked={level === "advanced"} onChange={(e) => setLevel(e.target.value)} /> Advanced <br />
        </div>

      <div className="question">
      <label className="lbl">What is the type of your voice?</label><br />
      <input type="radio" name="voice" value="soprano" checked={voice === "soprano"} onChange={(e) => setVoice(e.target.value)} /> Soprano <br />
      <input type="radio" name="voice" value="alto" checked={voice === "alto"} onChange={(e) => setVoice(e.target.value)} /> Alto <br />
      <input type="radio" name="voice" value="tenor" checked={voice === "tenor"} onChange={(e) => setVoice(e.target.value)} /> Tenor <br />
      <input type="radio" name="voice" value="bass" checked={voice === "bass"} onChange={(e) => setVoice(e.target.value)} /> Bass <br />
      <input type="radio" name="voice" value="not-sure" checked={voice === "not-sure"} onChange={(e) => setVoice(e.target.value)} /> I don't know <br />
        </div>

        <div className="question">
          <label className="lbl">Do you play any instruments?</label><br />
          <input type="text" placeholder="guitar" value={instrument} onChange={(e) => setInstrument(e.target.value)} />
        </div>

        <div className="question">
          <label className="lbl">Your meal preferences</label><br />
          <input type="radio" name="meal" value="vegetarian" checked={meal === "vegetarian"} onChange={(e) => setMeal(e.target.value)} /> Vegetarian <br />
          <input type="radio" name="meal" value="meat" checked={meal === "meat"} onChange={(e) => setMeal(e.target.value)} /> Meat <br />
        </div>

        <div className="question">
          <label className="lbl">Do you agree to the terms and conditions?</label><br />
          
          <input type="radio" name="terms" value="yes" checked={terms === "yes"} onChange={(e) => setTerms(e.target.value)} /> Yes
          <input type="radio" name="terms" value="no" checked={terms === "no"} onChange={(e) => setTerms(e.target.value)} /> No <br />
          </div>
          <a className="additional-btn"href="#terms-and-conditions">Terms and Conditions</a> 
        
       
        <div className="question">
          <label className="lbl">Do you consent to being recorded?</label><br />
          
          <input type="radio" name="privacy" value="yes" checked={privacy === "yes"} onChange={(e) => setPrivacy(e.target.value)} /> Yes
          <input type="radio" name="privacy" value="no" checked={privacy === "no"} onChange={(e) => setPrivacy(e.target.value)} /> No <br />
          </div>
          <a className="additional-btn" href="#filming-consent">Filming Consent</a>  
        

        </section>
        <button type="submit">Register</button>
      </form>

  
    ) :
(
  // Subition confirmation message and button to register another person
        <div className="submitted-box">
          <p className="reg-confirmation-message">{submitted.name}, your Registration has been received!</p>
          <button className="newBtn" onClick={handleNewRegistration}>Register Another Person</button>
          
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
      <p className="plain-text">1. Do udziału w I Bedfordzkich Warsztatach Muzyki  Liturgicznej serdecznie zapraszamy:

organistów, katechetów, siostry zakonne, osoby śpiewające w scholach, chórach i innych zainteresowanych śpiewem na chwałą Bożą

grających na instrumentach (skład orkiestry symfonicznej oraz band), uczniów Szkoły Muzycznej studentów, profesjonalnych instrumentalistów i amatorów

aby wziąć udział w warsztatach nie jest wymagana znajomość czytania nut, nie musisz posiadać wykształcenia muzycznego

2. Warsztaty będą prowadzone przez Huberta Kowalskiego, kompozytora, dyrygenta, producenta muzycznego, kontrabasistę i wokalistę.

3. Uczestnicy warsztatów, chórzyści i instrumentaliści, wezmą udział w zajęciach z emisją głosu, kształcenia słuchu muzycznego, dykcji, nauki pieśni liturgicznych i uwielbieniowych, chorału gregoriańskiego, doskonalenia gry na instrumentach oraz konferencjach na temat muzyki liturgicznej i w kręgu liturgicznym.

4. Sobotnie ćwiczenia warsztatowe są organizowane w sali głównej Stacja Dom Polski 

5. Zwieńczeniem warsztatów będzie Msza św. w niedzielę 23.03.2025 o godz.11.30 w kościele Sacred Heart of Jesus & St Cuthbert Church

6. Warunkiem wzięcia udziału w warsztatach  jest wypełnienie i przesłanie zgłoszenia

6a. Cena nie zawiera opłat parkingowych, biletów na przejazd oraz noclegu.

7. Opłata za uczestnictwo w warsztatach wynosi £35 od osoby powyżej 15 lat. Dla rodziny co najmniej 3 osób przebywających we wspólnym gospodarstwie domowym przewidujemy zniżki. Dzieci poniżej 5 lat wstęp wolny. Młodzież w wieku 5-15 lat £15 Kwota obejmuje koszty prowadzenia zajęć, materiałów dydaktycznych, dyplomów uczestnictwa, serwisu kawowego i ciast oraz obiad w sobotę.

8. Istnieje możliwość wykupienia obiadów w  trzecim dniu warsztatów ( niedziela) po wcześniejszym wpisie na listę.

9. Zajęcia odbywają się pod stałym nadzorem instruktorów według opracowanego programu. Organizator zastrzega sobie prawo do zmiany zajęć uwzględnionych w programie z przyczyn niezależnych od niego.

10. Misją naszych Warsztatów jest stworzenie niepowtarzalnego zespołu, by oddawać chwałę Bogu przez muzykę, w związku z czym niedopuszczalne jest podczas warsztatów wulgarne zachowanie czy przyjmowanie używek. Osoby, które nie zastosują się do tego punktu regulaminu zostaną niezwłocznie wykluczone z warsztatów.

11. Osoby niepełnoletnie mogą uczestniczyć w warsztatach jedynie za zgodą rodzica/prawnego opiekuna oraz pod jego opieką.

12. Uczestnicy zobowiązani są do podporządkowania się zaleceniom instruktorów i organizatorów, a także do przestrzegania zasad bezpieczeństwa, ładu i porządku.

13. Ze względu na charakter i specyfikę prowadzonych zajęć, częstotliwość przerw oraz czas ich trwania może ulec zmianie. Decyzję podejmuje organizator w porozumieniu z osobami prowadzącymi warsztaty

14. Podczas Mszy św. w niedzielę oraz obowiązuje uczestników strój galowy w kolorach biały/czarny.

15. Organizator nie odpowiada za rzeczy zagubione oraz za ewentualne zniszczenia rzeczy należących do uczestników.

16. Uczestnicy otrzymają potrzebne materiały podczas rejestracji przy wejsściu do  sal zajęciowych.

17. Organizator dołoży wszelkich starań, aby zapewnić bezpieczeństwo uczestników podczas trwania zajęć ujętych w programie. Nie ponosi natomiast odpowiedzialności za bezpieczeństwo i zachowanie uczestników w czasie nie ujętym w programie zajęć (dojazd, nocleg).

18. Uczestnicy warsztatów wyrażają zgodę na rejestrację prób oraz finałowego występu i przenoszą nieodpłatnie na rzecz Organizatora prawa do artystycznych wykonań dokonanych podczas warsztatów, z prawem przenoszenia na osoby trzecie. Uczestnicy wyrażają zgodę na rejestrację i publikowanie swojego wizerunku w mediach, mediach społecznościowych w celu dokumentacji i rejestracji przebiegu spotkania i koncertu.

22. Regulamin obowiązuje od  momentu rozpoczęcia zajęć do  momentu ich zakończenia zajęć

23. Zgłoszenie na warsztaty  jest równoznaczne z akceptacją postanowień niniejszego Regulaminu.</p>
    </div>
    <div className="question">
      <p className="title" id="filming-consent">Filming Consent</p>
      <p className="plain-text">I give my permission to use my photograph and video. I understand that the images may be used in print publications, online publications, presentations, websites, and social media. I also understand that no royalty, fee or other compensation shall become payable to me by reason of such use.</p>
    </div>
    <div className="question">
      <p className="title" id="payment-information">Payment Information</p>
      <p className="plain-text">Please make a payment to:</p>
      <p className="plain-text">Malgorzata Patecka</p>
      <p className="plain-text">Sort Code: </p>
      <p className="plain-text">Account No:</p>

    </div>
    
    
    </div>
  );
}

export default App;