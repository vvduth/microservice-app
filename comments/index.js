const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");
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

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentByPostId[req.params.id] || [];

  comments.push({ id: commentId, content });

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
    },
  });

  commentByPostId[req.params.id] = comments;

  res.status(201).send(comments);
});
app.post('/events', (req, res) => {
  console.log('Received Event:', req.body.type);
  res.send({});
})
// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
