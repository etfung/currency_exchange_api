import { convert_currency, year_over_year } from './service/index';
import express from 'express';
import { COUNTRY_CODE } from './constant/country_code';
import dayjs from 'dayjs';

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello')
})

app.post('/convert', async (req, res, next) => {
    const { exchange_to, amount } = req.body
    if (exchange_to === undefined || amount === undefined) {
        res.status(400).send('Please enter a value for exchange_to, amount');

    } else if (!COUNTRY_CODE.includes(exchange_to)) {
        res.status(400).send('Please enter a valid country code');
    } else {
        const response = await convert_currency({ exchange_to, amount })
        res.send(response);
    }
})

app.post('/history', async (req, res, next) => {
    const { start_date, end_date, data_type, exchange_to } = req.body
    if (dayjs(start_date).isSameOrAfter(new Date()) || dayjs(end_date).isSameOrAfter(new Date())) {
        res.status(400).send('Dates must not be greater than today');
    } else if (!COUNTRY_CODE.includes(exchange_to)) {
        res.status(400).send('Please enter a valid country code');
    } else if (data_type !== "daily" && data_type !== "monthly" && data_type !== "yearly") {
        res.status(400).send('Please enter a valid data type daily, monthly or yearly');
    } else if (data_type === "daily" && dayjs(start_date).isSame(end_date, 'd') ||
        data_type === 'monthly' && dayjs(start_date).isSame(end_date, 'M') ||
        data_type === 'yearly' && dayjs(start_date).isSame(end_date, 'y')) {
        res.status(400).send('Start date must not be greater than end date');
    } else {
        const response = await year_over_year({ start_date, end_date, data_type, exchange_to })
        res.send(response);
    }

})

export default app