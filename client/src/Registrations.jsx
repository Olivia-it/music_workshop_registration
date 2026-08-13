import { useState, useEffect } from "react";

function Registrations(){
const [registrations, setRegistrations] = useState([]);

useEffect(() => {
    //function to load the registrations, async because will wait for server response
    async function loadRegistrations(){
        const response = await fetch("http://localhost:5000/registrations");
        const data = await response.json();

        //replaces [] with data so registrations now have the data
        setRegistrations(data);
    }

    loadRegistrations();
}, []);

return (
<div>
    <h1>List of Registrations</h1>

    {registrations.map((person) => (
        <div key={person._id}>
        <p>Name: {person.name}</p>
        <p>Email: {person.email}</p>
        <p>Phone: {person.phone}</p>
        <hr />
</div>
    ))}
</div>

);
}


export default Registrations;
