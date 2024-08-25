const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const {randomBytes} = require('crypto');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const comments = new Map();

app.get('/posts/:pId/comments', (req, res) => {
    const pId = req.params.pId;
    res.send(comments.get(pId));
});

app.post('/posts/:pId/comments', async (req, res) => {
    const pId = req.params.pId;
    const cId = randomBytes(4).toString('hex');
    const {content} = req.body;
    const values = comments.get(pId) || [];
    values.push({id: cId, content, status: 'pending'});
    comments.set(pId, values);
    await axios.post('http://event-bus-service:4005/events',
        {type: 'EventCommentCreated', data: {pId, cId, content, status: 'pending'}});
    res.status(201).json({id: cId, content, status: 'pending'});
});

app.post('/events', async (req, res) => {
    const {type, data} = req.body;
    switch (type) {
        case 'EventCommentVerified':
            const values = comments.get(data.pId);
            const value = values.find(c => c.id === data.cId);
            value.status = data.status;
            await axios.post('http://event-bus-service:4005/events',
                {type: 'EventCommentUpdated', data: {pId: data.pId, cId: value.id, content: value.content, status: value.status}})
            break;
    }
    res.send({});
})

app.listen(4001, () => {
    console.log('Server started on port 4001');
})