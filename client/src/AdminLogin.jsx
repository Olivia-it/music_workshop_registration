import {useState} from "react";

function AdminLogin({onLogin}){
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");

async function handleLogin(event){
    event.preventDefault();
    setError("");

    try {
        const response = await fetch("http://localhost:5000/admin/login", 
        {
            method: "POST", 
            headers:{ "Content-type": "application/json",}, 
            body: JSON.stringify({
                email: email,
                password: password,}),
            });
    
     const data = await response.json();
     if(data.success){
        onLogin(data.token);
     } else {
        setError(data.message);
     }
    
    } catch (error){
        setError("Unable to connect to the server")
    }

}


return (
    <div>
        <h1>Registration Admin Login</h1>
        {error && <p>{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="login">
            <label className="lbl">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        <div className="login">
            <label className="lbl">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
         <button type="submit">Login</button>

        </form>
    </div>
); 
}

// next connect login  page to the app

export default AdminLogin;
