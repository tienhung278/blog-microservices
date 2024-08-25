const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const {randomBytes} = require('crypto');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = new Map();

app.get('/posts', (req, res) => {
    res.send(Array.from(posts, ([key, value]) => ({id: key, title: value})));
});

app.post('/posts', async (req, res) => {
    const pId = randomBytes(4).toString('hex');
    const {title} = req.body;
    posts.set(pId, title);
    await axios.post('http://event-bus-service:4005/events', {type: 'EventPostCreated', data: {pId, title}});
    res.status(201).send({id: pId, title})
});

app.post('/events', (req, res) => {
    const {type} = req.body;
    console.log(type);
    res.send({});
})

app.listen(4000, () => {
    console.log('Server running on port 4000');
})