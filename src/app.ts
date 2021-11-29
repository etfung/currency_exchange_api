import convert_currency from './service/convert_currency';
import express from 'express';
import { COUNTRY_CODE } from './constant/country_code';

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello')
})

app.get('/convert', async (req, res, next) => {
    const { exchange_to, amount } = req.body
    if (exchange_to === undefined || amount === undefined) {
        next('Please enter a value for exchange_to, amount')
    } else if (!COUNTRY_CODE.includes(exchange_to)) {
        next('Please enter a valid country code')
    } else {
        const response = await convert_currency({ exchange_to, amount })
        res.send(response);
    }
})

module.exports = app;