const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
const port = 4003;

app.use(bodyParser.json());
app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  console.log("Received Event 123:", req.body.type);

  if (type === "CommentCreated") {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';
    console.log("status", status);

    await axios
      .post("http://event-bus-srv:4005/events", {
        type: "CommentModerated",
        data: {
          id: data.id,
          postId: data.postId,
          content: data.content,
          status: status,
        },
      })
  }

  res.send({});
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
