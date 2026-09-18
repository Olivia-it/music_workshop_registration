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
<div className="top-bar">
<button onClick={() => setShowAdmin(false)}>Registration Form</button>

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