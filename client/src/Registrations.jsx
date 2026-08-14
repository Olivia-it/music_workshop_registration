import { useState, useEffect } from "react";
import "./App.css"


function Registrations() {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    async function loadRegistrations() {
      try {
        const response = await fetch("http://localhost:5000/registrations",
          {headers:{
            Autorization: localStorage.getItem("adminToken"),
          }
          });
        const data = await response.json();

        console.log(data);

        setRegistrations(data);
      } catch (error) {
        console.log("Error loading registrations:", error);
      }
    }

    loadRegistrations();
  }, []);

  return (

  <div className="container">
     <h1>Registrations</h1>

    {registrations.length === 0 ? (
      <p>No registrations found.</p>
     ) : (
       registrations.map((person) => (
          <div key={person._id}>
             <p><strong>Name:</strong> {person.name}</p>
             <p><strong>Email:</strong> {person.email}</p>
             <p><strong>Phone:</strong> {person.phone}</p>
             <hr />
           </div>
         ))
       )}
     </div>
  );
}

export default Registrations;