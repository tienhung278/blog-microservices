const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const filterWords = ['orange', 'apple', 'banana'];

app.post('/events', async (req, res) => {
    const {type, data} = req.body;
    switch (type) {
        case 'EventCommentCreated':
            const hasFilterWord = filterWords.some(filterWord => data.content.includes(filterWord));
            data.status = hasFilterWord ? 'rejected' : 'approved';
            await axios.post('http://localhost:4001/events', {type: 'EventCommentVerified', data});
            break;
    }

    res.send({});
});

app.listen(4003, () => {
    console.log('Server started on port 4003');
})