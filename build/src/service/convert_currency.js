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
const fetch_data_1 = __importDefault(require("../util/fetch_data"));
const convert_currency = ({ exchange_to, amount }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (exchange_to.length > 3) {
            throw new Error('to must have only 1 country code');
        }
        const capitalizedExchangeTo = exchange_to.toUpperCase();
        const currentDate = new Date();
        const formatCurrentDate = currentDate.toISOString().slice(0, 10);
        const data = yield (0, fetch_data_1.default)({ formatCurrentDate, exchange_to: capitalizedExchangeTo });
        const rates = data.rates[capitalizedExchangeTo];
        const computeExchange = amount * rates;
        return {
            exchange_from: data.base,
            exchange_to: capitalizedExchangeTo,
            exchange_rate: rates,
            exchange_from_amount: amount,
            exchange_to_amount: computeExchange,
        };
    }
    catch (e) {
        if (typeof e === "string") {
            throw new Error(e.toUpperCase());
        }
        else if (e instanceof Error) {
            throw new Error(e.message);
        }
    }
});
exports.default = convert_currency;
