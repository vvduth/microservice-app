const express = require('express');
const bodyParser = require("body-parser")
const {randomBytes} = require("crypto")
const cors = require("cors")
const axios = require("axios")

const app = express();
const port = 4000;
app.use(bodyParser.json())
app.use(cors())
const posts = {}

app.get('/posts', (req, res) => {
    res.send(posts)
});


app.post('/posts/create', async (req, res) => {
    const id = randomBytes(4).toString("hex");
    const {title}    = req.body;

    posts[id] = {id, title}

    await axios.post("http://event-bus-srv:4005/events", {
        type: "PostCreated",
        data: {
            id, title
        }
    })
    res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
    console.log('Received Event:', req.body.type);
    res.send({});
})

app.listen(port, () => {
    console.log("version 55")
    console.log(`Server is running on http://localhost:${port}`);
});