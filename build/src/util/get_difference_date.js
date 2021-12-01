"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
const isSameOrBefore_1 = __importDefault(require("dayjs/plugin/isSameOrBefore"));
const isSameOrAfter_1 = __importDefault(require("dayjs/plugin/isSameOrAfter"));
dayjs_1.default.extend(isSameOrBefore_1.default);
dayjs_1.default.extend(isSameOrAfter_1.default);
var get_days_between = (startDate, endDate, type) => {
    const nbDays = endDate.diff(startDate, type) + 1;
    const result = [...Array(nbDays).keys()]
        .map(i => startDate.clone().add(i, type).format('YYYY-MM-DD'));
    return result;
};
const get_difference_date = ({ start_date, end_date, data_type }) => {
    const today = (0, dayjs_1.default)(new Date());
    const dayjs_start_date = (0, dayjs_1.default)(start_date);
    const dayjs_end_date = (0, dayjs_1.default)(end_date);
    let compiled_date = [];
    switch (data_type) {
        case 'daily':
            compiled_date = get_days_between(dayjs_start_date, dayjs_end_date, 'd');
            break;
        case 'monthly':
            compiled_date = get_days_between(dayjs_start_date, dayjs_end_date, 'M');
            break;
        case 'yearly':
            compiled_date = get_days_between(dayjs_start_date, dayjs_end_date, 'y');
            break;
    }
    return compiled_date;
};
exports.default = get_difference_date;
