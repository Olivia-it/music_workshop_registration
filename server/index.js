const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

//setting up the server:
//-npm install express cors
//create index.js, run index.js
// "/" end point is root of the server
// app is express server
app.get("/", (req, res) => {
    res.send("server is running");
});

app.listen(5000, () => {
    console.log("My server running on localhost:5000")
}
)

//connect react form to backend