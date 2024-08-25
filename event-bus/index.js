const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
    const event = req.body;
    await axios.post('http://post-service:4000/events', event);
    await axios.post('http://comment-service:4001/events', event);
    await axios.post('http://query-service:4002/events', event);
    await axios.post('http://moderate-service:4003/events', event);
    res.send({});
})

app.listen(4005, () => {
    console.log('Server running on port 4005');
})