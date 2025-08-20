require("dotenv").config(); // load env first
const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

connectToMongo(); // connect to MongoDB

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// Test route
app.get("/", (req, res) => {
  res.send("Hello Zaki!");
});

const path = require('path');

// Serve React frontend
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`🚀 iNotebook backend listening on port ${port}`);
});




