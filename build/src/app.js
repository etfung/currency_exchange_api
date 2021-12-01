"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./service/index");
const express_1 = __importDefault(require("express"));
const country_code_1 = require("./constant/country_code");
const dayjs_1 = __importDefault(require("dayjs"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('hello');
});
app.post('/convert', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { exchange_to, amount } = req.body;
    if (exchange_to === undefined || amount === undefined) {
        res.status(400).send('Please enter a value for exchange_to, amount');
    }
    else if (!country_code_1.COUNTRY_CODE.includes(exchange_to)) {
        res.status(400).send('Please enter a valid country code');
    }
    else {
        const response = yield (0, index_1.convert_currency)({ exchange_to, amount });
        res.send(response);
    }
}));
app.post('/history', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { start_date, end_date, data_type, exchange_to } = req.body;
    if ((0, dayjs_1.default)(start_date).isSameOrAfter(new Date()) || (0, dayjs_1.default)(end_date).isSameOrAfter(new Date())) {
        res.status(400).send('Dates must not be greater than today');
    }
    else if (!country_code_1.COUNTRY_CODE.includes(exchange_to)) {
        res.status(400).send('Please enter a valid country code');
    }
    else if (data_type !== "daily" && data_type !== "monthly" && data_type !== "yearly") {
        res.status(400).send('Please enter a valid data type daily, monthly or yearly');
    }
    else if (data_type === "daily" && (0, dayjs_1.default)(start_date).isSame(end_date, 'd') ||
        data_type === 'monthly' && (0, dayjs_1.default)(start_date).isSame(end_date, 'M') ||
        data_type === 'yearly' && (0, dayjs_1.default)(start_date).isSame(end_date, 'y')) {
        res.status(400).send('Start date must not be greater than end date');
    }
    else {
        const response = yield (0, index_1.year_over_year)({ start_date, end_date, data_type, exchange_to });
        res.send(response);
    }
}));
exports.default = app;
