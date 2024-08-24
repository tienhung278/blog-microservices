const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = new Map();

app.get('/posts', (req, res) => {
    const data = Array.from(posts, ([key, values]) => values);
    res.send(data);
})

app.post('/events', async (req, res) => {
    const {type, data} = req.body;
    const post = posts.get(data.pId);
    let comments = [];
    if (post) {
        comments = post.comments;
    }
    console.log(type);
    switch (type) {
        case 'EventPostCreated':
            posts.set(data.pId, {id: data.pId, title: data.title, comments: []});
            break;
        case 'EventCommentCreated':
            comments.push({id: data.cId, content: data.content, status: data.status});
            break;
        case 'EventCommentUpdated':
            const comment = comments.find(comment => comment.id === data.cId);
            comment.status = data.status;
            break;
    }

    res.send({});
})

app.listen(4002, () => {
    console.log('Server running on port 4002');
});