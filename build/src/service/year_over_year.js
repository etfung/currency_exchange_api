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
const get_difference_date_1 = __importDefault(require("../util/get_difference_date"));
const year_over_year = ({ start_date, end_date, data_type, exchange_to }) => __awaiter(void 0, void 0, void 0, function* () {
    // const capitalized_exchange_to = exchange_to.toUpperCase()
    try {
        const data = [{}];
        let prev_rate = 0;
        const compiled_dates = (0, get_difference_date_1.default)({ start_date, end_date, data_type });
        for (let i = 0, j = 1; i < compiled_dates.length; i++, j++) {
            let computed_percentage = 0;
            const next_index = j == compiled_dates.length ? j - 1 : j;
            const response_data_prev = yield (0, fetch_data_1.default)({ formatCurrentDate: compiled_dates[i], exchange_to });
            const response_data_current = yield (0, fetch_data_1.default)({ formatCurrentDate: compiled_dates[next_index], exchange_to });
            prev_rate = response_data_prev.rates[exchange_to];
            const current_rate = response_data_current.rates[exchange_to];
            computed_percentage = ((current_rate - prev_rate) / prev_rate) * 100;
            const remove_negative = Math.abs(computed_percentage).toFixed(2);
            const positive_negative_sign = current_rate > prev_rate ? '+' : '-';
            const format_percentage = `${positive_negative_sign}${remove_negative}`;
            if (i === 0) {
                data[0] = ({ [response_data_prev.date]: null });
                data.push({ [response_data_current.date]: format_percentage });
            }
            else if (i !== next_index) {
                data.push({ [response_data_current.date]: format_percentage });
            }
        }
        return data;
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
exports.default = year_over_year;
