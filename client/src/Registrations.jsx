import { useState, useEffect } from "react";
import "./App.css";

function Registrations() {
  const [registrations, setRegistrations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRegistrations() {
      try {
        const token = localStorage.getItem("adminToken");

        const response = await fetch("https://music-workshop-registration.onrender-1.com/registrations", {
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
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {registrations.map((person, index) => (
              <tr key={person._id}>
                <td className="index">{index + 1}</td>
                <td>{person.name}</td>
                <td>{person.email}</td>
                <td>{person.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}



export default Registrations;