import { useState, useEffect } from "react";
import "./App.css";

function Registrations() {
  const [registrations, setRegistrations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  //this is FE but it's talking to BE
  useEffect(() => {
    async function loadRegistrations() {
      try {
        const token = localStorage.getItem("adminToken");

//use BE url becase function Registration function is talking to BE
        const response = await fetch("https://music-workshop-registration.onrender.com/registrations",
        //const response = await fetch("http://localhost:5000/registrations", 
{
          headers: {
            Authorization: token,
          },
        });
      

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Could not load registrations");
          return;
        }

        setRegistrations(data);
      } catch (err) {
        setError("Unable to connect to the server");
      } finally {
        setLoading(false);
      }
    }

    loadRegistrations();
  }, []);

  if (loading) {
    return <p>Loading registrations...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  

//  function handleCancel(event) {
//   const row = event.target.closest("tr");
//   row.classList.add("cancelled");
// }

async function handlePaid(id) {
  try {
    const token = localStorage.getItem("adminToken");

    const response = await fetch(
      `https://music-workshop-registration.onrender.com/registrations/${id}/paid`,
      {
        method: "PATCH",
        headers: {
          Authorization: token,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.log("Payment update response:", data);
      alert(
        `Payment update failed: ${response.status} - ${
          data.message || data.error || "Unknown error"
        }`
      );
      return;
    }

    setRegistrations((currentRegistrations) =>
      currentRegistrations.map((person) =>
        person._id === id ? { ...person, paid: true } : person
      )
    );
  } catch (error) {
    console.error("Payment update error:", error);
    alert(`Unable to connect to the server: ${error.message}`);
  }
}




  return (
    <div className="container">
      <h1>Registrations</h1>

      {registrations.length === 0 ? (
        <p>No registrations found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th className="index">ID</th>
              <th>Name</th>
              <th>Paid-btn</th>
              <th>Paid</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Age</th>
              <th>Parish</th>
              <th>Level</th>
              <th>Voice</th>
              <th>Instrument</th>
              <th>Meal</th>
              <th>Allergy</th>
              <th>Terms</th>
              <th>Privacy</th>
            
            </tr>
          </thead>

          <tbody>
            {registrations.map((person, index) => (
              <tr key={person._id}>
                <td className="index">{index + 1}</td>
                <td>{person.name}</td>
                <td><button className="unpaid-btn" onClick={() => handlePaid(person._id)} disabled={person.paid}>{person.paid ? "" : ""} </button></td>
                <td className="paid"> {person.paid ? "Yes" : "No"}</td>
                <td>{person.email}</td>
                <td>{person.phone}</td>
                <td>{person.age}</td>
                <td>{person.parish}</td>
                <td>{person.level}</td>
                <td>{person.voice}</td> 
                <td>{person.instrument}</td>
                <td>{person.meal}</td>
                <td>{person.allergy}</td>
                <td>{person.terms}</td>
                <td>{person.privacy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}



export default Registrations;