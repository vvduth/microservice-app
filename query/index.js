const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4002;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


const posts = {};
// Routes
app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    if (type === 'PostCreated') {
        const {id, title} = data;
        posts[id] = {id, title, comments: []};
    } 

    if (type === 'CommentCreated') {
        const {id, content, postId, status } = data;
        const post = posts[postId];
        post.comments.push({id, content, status });
    }

    if(type === 'CommentUpdated') {
        const {id, content, postId, status } = data;
        const post = posts[postId];
        const comment = post.comments.find(comment => {
            return comment.id === id;
        });
        comment.status = status;
        comment.content = content;
    }

    console.log(posts);
    res.send({});

});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});