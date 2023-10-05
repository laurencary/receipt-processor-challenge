const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const cache = require('memory-cache');
const scorer = require('./utils/scorer');

const app = express();
const port = 5000;

const receiptCache = new cache.Cache();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/receipts/process', async (req, res) => {
    try {
        const id = uuidv4();
        receiptCache.put(id, req.body);
        return res.json({ id });
    }
    catch (err) {
        return res.status(400).json({ description: "The receipt is invalid" })
    }
});

app.get(`/receipts/:id/points`, (req, res) => {
    try {
        const receipt = receiptCache.get(req.params.id);
        const points = scorer.calculateReceiptScore(receipt);
        return res.json({ points })
    } catch (error) {
        return res.status(404).json({ description: "No receipt found for that id"})
    }
})

app.listen(port, () => {
    console.log(`Receipt processor app listening on port ${port}`)
})