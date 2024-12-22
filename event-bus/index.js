const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
const port = 4005;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.post("/events", async (req, res) => {
  const event = req.body;
  await axios.post("http://localhost:4000/events", event).catch((err) => {
    console.log(err.message);
  });
  await axios.post("http://localhost:4001/events", event).catch((err) => {
    console.log(err.message);
  });
  await axios.post("http://localhost:4002/events", event).catch((err) => {
    console.log(err.message);
  });
  res.send({ status: "OK" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});