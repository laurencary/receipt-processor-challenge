const express = require('express');
const router = express.Router();

router.post('/process', async (req, res) => {
    try {
        res.send('inside receipts')
    }
    catch (err) {
        return res.json([]);
    }
});

router.get(`/:id/points`, (req, res) => {
    res.send(`Receipt ${req.params.id}`);
})


module.exports = router;