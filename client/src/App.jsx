import "./App.css"

function App() {
  return (
    <div className="container">
      <h1>Music Workshop Registration Form</h1>
      <p>Please enter your details to register</p>

      <form>
        <div class="name">
          <label>Full Name</label><br />
          <input type="text" placeholder="John Smith" />
        </div>

        <div class="email">
          <label>Email</label><br />
          <input type="email" placeholder="john@example.com" />
        </div>

        <div class="phone">
          <label>Phone Number</label><br />
          <input type="number" placeholder="079..." />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default App;