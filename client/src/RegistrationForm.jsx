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
  setError("Wpisz swoje imie.")
  return;
}
if(email.trim()=== ""){
  console.log("Email validation");
  setError("Wpisz swoj email");
  return;
}
if(!email.includes("@")){
  console.log("Invalid email validation");
  setError("Nieprawidlowy email.")
  return;
}
if(phone.trim() === ""){
  console.log("Phone validation");
  setError("Wpisz swoj numer telefonu.");
  return;
}
if(phone.length < 11){
  console.log("Invalid phone validation");
  setError("Please enter a valid phone number");
  return;
}

if(age === ""){
  setError("Wpisz swoj wiek.");
  return;
}

if(parish === ""){
  console.log("First time validation");
  setError("Wpisz swoja parafie albo napisz ze nie masz.");
  return;
}

if(level === ""){
  console.log("Level validation");
  setError("Wybierz swoj poziom spiewu.");
  return;
}

if(voice === ""){
  console.log("Voice validation");
  setError("Wybierz jakim glosem spiewasz");
  return;
}

if(meal === ""){
  console.log("Meal validation");
  setError("Please select your meal preference");
  return;
}

if(allergy === ""){
  setError("Wpisz swoje alergie albo napisz: nie.");
  return;
}

if(terms === ""){
  console.log("Terms validation");
  setError("Zaakceptuj regulami zeby sie zapisac.");
  return;
}

if(terms === "no"){
  console.log("Terms validation");
  setError("Zaakceptuj regulami zeby sie zapisac.");
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
      <img className="logo" src="https://www.stignatius.pl/wp-content/uploads/st-ignatius-polskie-duszpasterstwo-logo-w200.jpg"
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
      <h2>Warsztaty Muzyki Liturgicznej z Hubertem Kowalskim</h2>
      
    {!submitted ?(
      <form onSubmit={handleSubmit}>
  
       {error && <p className="error-msg">{error}</p>}

      {/* closed registration code */}

      {/* <div className="question">
      <p>Przepraszamy rejestracja jest juz zamknieta</p>
      </div> */}


{/* will display when reg closes */}
       <div className="closed">

  <section id="q1" className="personal-info question">

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

        <div id="q3" className="question">  
          <label className="lbl">Ile masz lat?</label><br />
          <input type="radio" name="age" value="teen" checked={age === "teen"} onChange={(e) => setAge(e.target.value)}/> Poniżezej 15 lat <br />
          <input type="radio" name="age" value="adult" checked={age === "adult"} onChange={(e) => setAge(e.target.value)}/> 15+ <br />
        </div>

        <div className="question">
          <label className="lbl">Do jakiej parafi należysz?</label><br />
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
          <label className="lbl">Czy grasz na jakimś instrumencie?</label><br />
          <input type="text" placeholder="gitara" value={instrument} onChange={(e) => setInstrument(e.target.value)} />
        </div>

        <div className="question">
          <label className="lbl">Preferencje dotyczące posiłków</label><br />
          <input type="radio" name="meal" value="meat" checked={meal === "meat"} onChange={(e) => setMeal(e.target.value)} /> Mięsny <br />
          <input type="radio" name="meal" value="vegetarian" checked={meal === "vegetarian"} onChange={(e) => setMeal(e.target.value)} /> Wegetariański <br />
        </div>

        <div className="question">
          <label className="lbl">Alergie żywieniowe</label><br />
          <input type="text" placeholder="nie" value={allergy} onChange={(e) => setAllergy(e.target.value)}  />
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
        </div>
        {error && <p className="error-msg">{error}</p>}
        <button type="submit">Register</button>
      </form>

  
    ) :
(
  // Subition confirmation message and button to register another person
        <div className="submitted-box">
          <p className="reg-confirmation-message">Witamy {submitted.name}! <br /><br/>Otrzymaliśmy Twoją rejestrację. Wkrótce otrzymasz od nas e-mail z informacjami o sposobie dokonania płatności. <br /> Sprawdz koniecznie swoj Junk Mail Folder.</p>
          <button className="newBtn" onClick={handleNewRegistration}>Register Another Person</button>
          
          </div>
      )
      }

      <div className="division"></div>

      <div className="question">
      <p className="title" id="terms-and-conditions">Terms and Conditions</p>
      <p className="plain-text">
        <ol>
        <li>Do udziału w Warsztatach Muzyki Liturgicznej serdecznie zapraszamy:</li>
        <ol type="a">
          <li>osoby śpiewające w scholach i chórach oraz innych zainteresowanych śpiewem na chwałę Bożą;</li>
          <li>grających na instrumentach, uczniów, studentów, instrumentalistów profesjonalnych i amatorów;</li>
          <li>nie jest wymagane wykształcenie muzyczne, doświadczenie, ani znajomość nut;</li>
          <li>osoby niepełnoletnie mogą uczestniczyć w warsztatach jedynie za zgodą rodzica/prawnego opiekuna lub pełnoletniej osoby upoważnionej; pod jego stałą opieką podczas trwania warsztatów.</li>
        </ol>

        <li>Misją naszych warsztatów jest kształcenie umiejętnosci i rozwijanie talentów, by przez muzykę oddawać chwałę Bogu.</li>
        <li>Warsztaty są wydarzeniem niedochodowym. Opłata za warsztaty będzie wykorzystana w całości na pokrycie kosztów organizacyjnych.</li>
        <li>Organizator wraz z komitetem organizacyjnym to wolontariusze i jednocześnie uczestnicy warsztatów, którzy nie pobieraja wynagrodzenia. Obsługa warsztatów opiera się na pracy charytatywnej w czasie wolnym od codziennych obowiazków.</li>
        <li>Warsztaty będą prowadzone przez Huberta Kowalskiego, kompozytora, dyrygenta, producenta muzycznego, kontrabasistę i wokalistę.</li>
        <li>Uczestnicy warsztatów, chórzyści i instrumentaliści wezmą udział w zajęciach z emisji głosu, dykcji, akompaniowania, nauki pieśni liturgicznych oraz konferencjach na temat muzyki.</li>
        <li>Zajęcia odbywają się pod stałym nadzorem instruktorów według opracowanego programu. Organizator zastrzega sobie prawo do zmiany zajęć uwzględnionych w programie.</li>
        <li>Program warsztatów podzielony jest na trzy dni:</li>
        <ul>
        <li>piątek (13.11.2026) wieczór – przywitanie, zajęcia wstępne;</li>
        <li>sobota: szkoła St Ignatius Catholic Primary School, St Ann’s Road, London, N15 6ND</li>
        <li>niedziela: szkoła St Ignatius Catholic Primary School, St Ann’s Road, London, N15 6ND</li>
        </ul>
    
        <li>Zwieńczeniem warsztatów będzie Msza św. w niedzielę (15.11.2026) o godz.13.00 w kościele St Ignatius Catholic Church na Stamford Hill.</li>
        <li>Uczestnicy otrzymają potrzebne materiały podczas rejestracji przy wejściu.</li>
        <li>Warunkiem wzięcia udziału w warsztatach jest wypełnienie i przesłanie zgłoszenia z jednoczesnym dokonaniem pełnej, bezzwrotnej opłaty na konto podane przez organizatorów.</li>
        <li>Formularz dla osoby niepełnoletniej wypełnia rodzic / opiekun prawny.</li>
        <li>Opłata za udział w warsztatach wynosi £50 od osoby powyżej 15 lat. Młodzież i dzieci w wieku 7-15 lat - £30;</li>
        <ul>
          <li>Cena obejmuje koszty prowadzenia zajęć, materiałów dydaktycznych, serwisu kawowego i ciast oraz obiadu w sobotę.</li>
          <li>Cena nie zawiera opłat parkingowych, biletów na przejazd oraz noclegu.</li>
        </ul>
        
        <li>W przypadku rezygnacji z uczestnictwa, opłata nie będzie refundowana.</li>
        <li>Uczestnicy zobowiązani są do podporządkowania się zaleceniom instruktorów i organizatorów, a także do przestrzegania zasad bezpieczeństwa, porządku i wzajemnego szacunku.</li>
        <li>Organizator dołoży wszelkich starań, aby zapewnić bezpieczeństwo uczestników podczas trwania zajęć.</li>
        <li>Organizator nie odpowiada za rzeczy zagubione oraz za ewentualne zniszczenia rzeczy należących do uczestników.</li>
        <li>Za wszelkie szkody wyrządzone przez uczestnika odpowiada uczestnik lub jego opiekun prawny.</li>
        <li>Zabronione jest przyjmowanie używek czy wulgarne zachowanie. Palenie papierosów i e-papierosów jest niedopuszczlne w żadnym miejscu na terenie szkoły i parafii. Osoby, które nie zastosują się do tego punktu regulaminu zostaną niezwłocznie wykluczone z warsztatów.</li>
        <li>Uczestnicy warsztatów wyrażają zgodę na rejestrację prób oraz finałowego występu i przenoszą nieodpłatnie na rzecz Organizatora prawa do artystycznych wykonań dokonanych podczas warsztatów, z prawem przenoszenia na osoby trzecie. Uczestnicy wyrażają zgodę na rejestrację i publikowanie swojego wizerunku w mediach, mediach społecznościowych w celu dokumentacji i rejestracji przebiegu spotkania i koncertu.</li>
        <li>Zgłoszenie na warsztaty jest równoznaczne z akceptacją postanowień niniejszego Regulaminu.</li>
        <li>Kontakt mailowy: warsztaty.stamfordhill@gmail.com</li>
        </ol>
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