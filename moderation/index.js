const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 4003;

app.use(bodyParser.json());

app.post('/events', async (req, res) => {
    const event = req.body;

    try {
        // Example of making a request with axios
        const response = await axios.post('http://example.com/api', event);
        res.status(200).send(response.data);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});