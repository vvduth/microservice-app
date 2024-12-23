const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const e = require("express");
const app = express();
const port = 4005;

const events = [];

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.post("/events",  (req, res) => {
  const event = req.body;

  events.push(event);

  console.log("fro bus Received Event:", event.type); 
  axios.post("http://localhost:4000/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://localhost:4001/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://localhost:4002/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://localhost:4003/events", event).catch((err) => {
    console.log(err.message);
  });
  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
