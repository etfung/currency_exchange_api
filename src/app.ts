import convert_currency from './service/convert_currency';
import express from 'express';

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello')
})

app.get('/convert', async (req, res) => {
    const { from, to, amount } = req.body
    if (from === undefined || to === undefined || amount === undefined) {
        res.status(400)
        res.send('Please add a value for from, to, and amount')
    } else {
        const response = await convert_currency({ from, to, amount })
        res.send(response);
    }
})

module.exports = app;