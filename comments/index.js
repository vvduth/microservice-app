const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const app = express();
const port = 4001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

const commentByPostId = {};

// Routes
app.get("/posts/:id/comments", (req, res) => {
  res.send(commentByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentByPostId[req.params.id] || [];

  comments.push({ id: commentId, content });

  commentByPostId[req.params.id] = comments;

  res.status(201).send(comments);
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
