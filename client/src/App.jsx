import { useState } from "react";
import RegistrationForm from "./RegistrationForm";
import Registrations from "./Registrations";
import AdminLogin from "./AdminLogin";
import "./App.css";


function App(){
  const [showAdmin, setShowAdmin] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  function handleAdminLogin(token){
    localStorage.setItem("adminToken", token);
    setIsAdminLoggedIn(true);
  }

  function handleLogout(){
    localStorage.removeItem("adminToken")
    setIsAdminLoggedIn(false);
    setShowAdmin(false);
  }

  return (
    <div>
    {/* <div className="creator">

    <div className="creator-flex">
    <p>Created by Olivia Gie</p>
    </div>

    <div className="creator-flex">
    <img className="creator-logo" src="/src/assets/github-logo.png" alt="github-logo"/>
    <p>github.com/Olivia-it</p>
    </div>

    <div className="creator-flex">
    <img className="creator-logo" src="/src/assets/linkedin-logo.png" alt="linkedin-logo" />
    <p>www.linkedin.com/in/olivia-gie-developer</p>
    </div>
    </div> */}
<div className="top-bar"><a className=".reg-nav" href="#q1">
<button onClick={() => setShowAdmin(false)}>Registration Form</button></a>
  <button onClick={() => setShowAdmin(true)}>Admin Login</button>
  <button onClick={handleLogout}>Logout</button>
</div>



 {showAdmin ? (
  isAdminLoggedIn ? (<Registrations />) : (<AdminLogin onLogin={handleAdminLogin} />)
 ) :
 (<RegistrationForm />)
}
    </div>
  );
}



export default App;